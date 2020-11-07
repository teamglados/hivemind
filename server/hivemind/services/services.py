from datetime import datetime, timedelta

from sqlalchemy.sql import select

from hivemind.models import *
from hivemind.utils.stopwords import STOPWORDS

ACTIVE_THRESH_SECONDS = 6000

HINT_VOTE_SCORE = 1


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
        .where(users.c.id == user_id)
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

    ret = {"is_active": False}
    if results.fetchone():
        ret["is_active"] = True
    return ret


async def add_hint(conn, user_id, question_id, value):
    result = await conn.execute(
        Hint.insert()
        .values(user_id=user_id, question_id=question_id, value=value)
        .returning(Hint.c.id)
    )
    return result.fetchone()[0]


async def get_hints(conn, user_id, question_id):
    # TODO add if voted already
    result = await conn.execute(
        select(Hint)
        .where(Hint.c.user_id != user_id)
        .where(Hint.c.question_id == question_id)
    )

    return [dict(r) for r in result.fetchall()]


async def vote_hint(conn, user_id, hint_id, vote_type):
    prev_vote_res = await conn.execute(
        select(HintItem)
        .where(HintItem.c.user_id == user_id)
        .where(HintItem.c.hint_id == hint_id)
    )
    if prev_vote_res.fetchone():
        raise UserWarning("Already voted!")

    score = 1 if vote_type == "up" else -1
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

    user = dict(user)
    if active_question_last_active < get_active_threshold():
        await conn.execute(
            User.update()
            .where(users.c.id == user_id)
            .values(active_question_last_active=None, active_question_id=None)
        )
        user["active_question_last_active"] = None
    # TODO calc score
    # - Max score from questions
    # - Score from answers
    # - Score from discussions
    # - Score from hints
    return user


async def get_discussion_id(conn, user_id, question_id):
    select(User).where()
    pass