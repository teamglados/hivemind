from datetime import datetime, timedelta

from sqlalchemy.sql import select

from hivemind.models import *
from hivemind.utils.stopwords import STOPWORDS

ACTIVE_THRESH_SECONDS = 6000

HINT_VOTE_SCORE = 1


def create_user(sess, *args, **kwargs):
    user = User(*args, **kwargs)
    sess.add(user)
    sess.commit()
    return user


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

        q_dict = dict(q)
        q_dict["is_correct"] = is_correct
        q_dict["answer_count"] = len(question_answers)
        extended_questions.append(q_dict)

    return extended_questions


async def activate_question_for_user(conn, user_id, question_id):
    return await conn.execute(
        User.update().values(
            active_question_id=question_id,
            active_question_last_active=datetime.utcnow(),
        )
    )


async def is_question_active_among_users(conn, user_id, question_id):
    active_thresh = datetime.utcnow() - timedelta(seconds=ACTIVE_THRESH_SECONDS)
    results = await conn.execute(
        select(User)
        .where(User.c.active_question_id == question_id)
        .where(User.c.id != user_id)
        .where(User.c.active_question_last_active >= active_thresh)
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

    score = HINT_VOTE_SCORE * (1 if vote_type == "up" else -1)
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
