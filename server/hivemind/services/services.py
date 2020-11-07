from datetime import datetime, timedelta

from sqlalchemy.sql import select

from hivemind.models import *

ACTIVE_THRESH_SECONDS = 6000


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
    active_thresh = datetime.utcnow() - timedelta(
        seconds=ACTIVE_THRESH_SECONDS
    )
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
