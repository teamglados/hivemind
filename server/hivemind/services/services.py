from sqlalchemy.sql import select

from hivemind.models import *


def create_user(sess, *args, **kwargs):
    user = User(*args, **kwargs)
    sess.add(user)
    sess.commit()
    return user


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
            if q.answer == qa.value:
                is_correct = True
                break

        q_dict = dict(q)
        q_dict["is_correct"] = is_correct
        q_dict["answer_count"] = len(question_answers)
        extended_questions.append(q_dict)

    return extended_questions

