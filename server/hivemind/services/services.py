from uuid import uuid4
from datetime import datetime, timedelta

from sqlalchemy import func
from sqlalchemy.sql import select

from hivemind.models import *
from hivemind.utils.stopwords import STOPWORDS
from hivemind.ai import *

ACTIVE_THRESH_SECONDS = 70

HINT_VOTE_SCORE = 1
HINT_PRICE = 2

HINT_MAX = 70
MESSAGE_MAX = 20

PROFANITY_THRESHOLD = 0.5
SIMILARITY_THRESHOLD = 2.0

MAX_N_HINTS = 5


def get_extended_question(question, answers):
    question_answers = [a for a in answers if question.id == a.question_id]

    is_correct = False
    for qa in question_answers:
        if check_answer_correct(question, qa):
            is_correct = True
            break

    q_dict = dict(question)
    q_dict["is_correct"] = is_correct
    q_dict["answer_count"] = len(question_answers)
    return q_dict


async def create_user(conn, name):
    result = await conn.execute(User.insert().values(name=name).returning(User.c.id))

    return result.fetchone()[0]


def check_answer_correct(question, answer):
    return question.answer == answer.value


async def get_questions(conn, user_id):
    """ return all question """

    result = await conn.execute(select(Question))
    questions = result.fetchall()

    result = await conn.execute(select(Answer).where(Answer.c.user_id == user_id))
    answers = result.fetchall()

    extended_questions = []
    for q in questions:
        question_answers = [a for a in answers if q.id == a.question_id]

        is_correct = False
        for qa in question_answers:
            if check_answer_correct(q, qa):
                is_correct = True
                break

        q_dict = get_extended_question(q, question_answers)
        extended_questions.append(q_dict)

    return extended_questions


async def activate_question_for_user(conn, user_id, question_id):
    return await conn.execute(
        User.update()
        .where(User.c.id == user_id)
        .values(
            active_question_id=question_id,
            active_question_last_active=datetime.utcnow(),
        )
    )


def get_active_threshold():
    return datetime.utcnow() - timedelta(seconds=ACTIVE_THRESH_SECONDS)


async def is_question_active_among_users(conn, user_id, question_id):
    results = await conn.execute(
        select(User)
        .where(User.c.active_question_id == question_id)
        .where(User.c.id != user_id)
        .where(User.c.active_question_last_active >= get_active_threshold())
    )

    if results.fetchone():
        return True
    return False


async def add_hint(conn, user_id, question_id, value):
    words = value.lower().strip().split()
    stops = set(STOPWORDS)
    meaningful_words = [w for w in words if not w in stops]

    result = await conn.execute(select(Question).where(Question.c.id == question_id))
    question = result.fetchone()

    if question.answer in meaningful_words:
        raise ValueError("True answer is part of the hint text")

    if sentence_profanity_prob(value) > PROFANITY_THRESHOLD:
        raise ValueError("Profanity cannot be allowed")

    if sentence_semantic_similarity(value, question.answer) > SIMILARITY_THRESHOLD:
        raise ValueError("Hint semantically too close to the true answer")

    result = await conn.execute(
        Hint.insert()
        .values(user_id=user_id, question_id=question_id, value=value)
        .returning(Hint.c.id)
    )
    return result.fetchone()[0]


async def get_hint_score(conn, hint_id):
    result = await conn.execute(select(HintItem).where(HintItem.c.hint_id == hint_id))
    hint_items = result.fetchall()
    # always at least hint price
    return max(
        -1 * HINT_PRICE, min(sum([h.score * HINT_PRICE for h in hint_items]), 10)
    )


async def get_hints(conn, user_id, question_id):
    # TODO add if voted already
    result = await conn.execute(
        select(Hint)
        .where(Hint.c.user_id != user_id)
        .where(Hint.c.question_id == question_id)
    )

    hints = result.fetchall()
    hint_ids = [h.id for h in hints]

    result = await conn.execute(
        select(HintPurchase)
        .where(HintPurchase.c.user_id == user_id)
        .where(HintPurchase.c.hint_id.in_(hint_ids))
    )
    hint_purchases = result.fetchall()

    dict_hints = []
    for hint in hints:
        has_purchased = False
        for hp in hint_purchases:
            if hint.id == hp.hint_id:
                has_purchased = True
                break

        dhint = dict(hint)
        dhint["purchased"] = has_purchased
        dhint["total_score"] = await get_hint_score(conn, hint.id) or 2
        dict_hints.append(dhint)

    return sorted(dict_hints, key=lambda x: x["total_score"], reverse=True)[
        0:MAX_N_HINTS
    ]


async def vote_hint(conn, user_id, hint_id, score):
    prev_vote_res = await conn.execute(
        select(HintItem)
        .where(HintItem.c.user_id == user_id)
        .where(HintItem.c.hint_id == hint_id)
    )
    if prev_vote_res.fetchone():
        raise UserWarning("Already voted!")

    result = await conn.execute(
        HintItem.insert().values(user_id=user_id, hint_id=hint_id, score=score)
    )
    return ""


async def add_answer(conn, user_id, question_id, value):
    words = value.lower().strip().split()
    stops = set(STOPWORDS)
    meaningful_words = [w for w in words if not w in stops]
    answer = " ".join(meaningful_words)

    result = await conn.execute(
        Answer.insert()
        .values(user_id=user_id, question_id=question_id, value=value)
        .returning(Answer.c.id)
    )

    return await get_question(conn, user_id, question_id)


async def get_question(conn, user_id, question_id):
    result = await conn.execute(select(Question).where(Question.c.id == question_id))
    question = result.fetchone()

    result = await conn.execute(
        select(Answer)
        .where(Answer.c.user_id == user_id)
        .where(Answer.c.question_id == question_id)
    )
    answers = result.fetchall()

    return get_extended_question(question, answers)


async def get_user(conn, user_id):
    result = await conn.execute(select(User).where(User.c.id == user_id))
    user = result.fetchone()

    result = await conn.execute(
        select([func.count(User.c.active_discussion_id)]).where(
            User.c.active_discussion_id == user.active_discussion_id
        )
    )
    chat_user_count = result.fetchone()
    chat_active = True if chat_user_count and chat_user_count[0] > 1 else False
    duser = dict(user)
    duser["is_question_active"] = False

    if (
        user.active_question_last_active
        and user.active_question_last_active < get_active_threshold()
    ):
        await conn.execute(
            User.update()
            .where(User.c.id == user_id)
            .values(active_question_last_active=None, active_question_id=None)
        )
        if user.active_discussion_id:
            await conn.execute(
                User.update()
                .where(User.c.active_discussion_id == user.active_discussion_id)
                .values(active_discussion_id=None)
            )
        duser["active_question_last_active"] = None
        duser["active_discussion_id"] = None

    elif user.active_question_last_active:
        duser["is_question_active"] = await is_question_active_among_users(
            conn, user_id, user.active_question_id
        )
        if user.active_discussion_id and user.active_question_id:
            is_right_question = await does_question_and_discussion_match(
                conn, user.active_discussion_id, user.active_question_id
            )
            if not is_right_question and user.active_discussion_id:
                await conn.execute(
                    User.update()
                    .where(User.c.active_discussion_id == user.active_discussion_id)
                    .values(active_discussion_id=None)
                )
                duser["active_discussion_id"] = None

    result = await conn.execute(select(Question))
    questions = result.fetchall()
    question_score = sum([q.score for q in questions])
    result = await conn.execute(
        select([Question.c.score, Answer.c.id,])
        .select_from(Answer.outerjoin(Question))
        .where(Answer.c.value == Question.c.answer)
        .where(Answer.c.user_id == user_id)
    )
    answers = result.fetchall()
    answer_score = sum([q.score for q in answers])

    result = await conn.execute(
        select([func.sum(Message.c.score).label("score"), Message.c.discussion_id])
        .where(Message.c.user_id == user_id)
        .group_by(Message.c.discussion_id)
    )
    message_scores = result.fetchall()
    message_score = min(sum([q.score for q in message_scores]), MESSAGE_MAX)

    result = await conn.execute(select(Hint).where(Hint.c.user_id == user_id))
    hint_score = 0
    for hint in result.fetchall():
        hint_score += await get_hint_score(conn, hint.id)
    hint_score = min(hint_score, HINT_MAX)

    result = await conn.execute(
        select(HintPurchase).where(HintPurchase.c.user_id == user_id)
    )
    hint_purchases = result.fetchall()
    hint_purchase_score = sum([q.score for q in hint_purchases])

    duser["score"] = answer_score + message_score + hint_score + hint_purchase_score
    duser["answer_score"] = answer_score
    duser["hint_score"] = hint_score
    duser["message_score"] = message_score
    duser["hint_purchase_score"] = hint_purchase_score
    duser["max_score"] = question_score
    duser["chat_active"] = chat_active

    return duser


async def create_discussion(conn, user_id, question_id):
    discussion_id = uuid4()
    await conn.execute(
        DiscussionItem.insert()
        .values(
            score=1,
            discussion_id=discussion_id,
            question_id=question_id,
            user_id=user_id,
        )
        .returning(DiscussionItem.c.id)
    )
    return discussion_id


async def get_discussion_id(conn, user_id, question_id):

    result = await conn.execute(
        select([func.count(User.c.active_discussion_id), User.c.active_discussion_id])
        .where(User.c.active_discussion_id != None)
        .where(User.c.active_question_id == question_id)
        .group_by(User.c.active_discussion_id)
    )
    result_row = result.fetchone()
    if result_row:
        return result_row.active_discussion_id
    else:
        return await create_discussion(conn, user_id, question_id)


async def does_question_and_discussion_match(conn, discussion_id, question_id):
    result = await conn.execute(
        select(DiscussionItem)
        .where(DiscussionItem.c.discussion_id == discussion_id)
        .where(DiscussionItem.c.question_id == question_id)
    )
    results = result.fetchall()
    if results:
        return True
    return False


async def close_discussion(conn, user_id):
    result = await conn.execute(select(User).where(User.c.id == user_id))
    user = result.fetchone()
    if user and user.active_discussion_id:
        await conn.execute(
            User.update()
            .where(User.c.active_discussion_id == user.active_discussion_id)
            .values(active_discussion_id=None)
        )


async def add_message(conn, user_id, discussion_id, value):
    await conn.execute(
        Message.insert().values(
            user_id=user_id, discussion_id=discussion_id, value=value, score=0
        )
    )
    return ""


async def list_messages(conn, discussion_id):
    result = await conn.execute(
        select(Message).where(Message.c.discussion_id == discussion_id)
    )
    return [dict(m) for m in result.fetchall()]


async def vote_message(conn, message_id, score):
    result = await conn.execute(select(Message).where(Message.c.id == message_id))
    message = result.fetchone()
    score = message.score + score
    await conn.execute(Message.update().values(score=score))

    message = dict(message)
    message["score"] = score
    return message


async def open_hint(conn, user_id, hint_id):
    score = -1 * await get_hint_score(conn, hint_id)
    if score >= 0:
        score = 0
    result = await conn.execute(
        HintPurchase.insert().values(user_id=user_id, hint_id=hint_id, score=score)
    )

    return ""


async def get_hint_purchases(conn, user_id):
    result = await conn.execute(
        select(HintPurchase).where(HintPurchase.c.id == user_id)
    )
    return [dict(r) for r in result.fetchall()]


async def add_discussion_to_user(conn, user_id, discussion_id):
    await conn.execute(
        User.update()
        .values(active_discussion_id=discussion_id)
        .where(User.c.id == user_id)
    )
    return ""
