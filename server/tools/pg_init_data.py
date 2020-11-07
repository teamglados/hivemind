import asyncio
from sqlalchemy import MetaData
from sqlalchemy.sql import select
from sqlalchemy import MetaData

from hivemind.models import *
from hivemind.config import SQLALCHEMY_DATABASE_URI
from hivemind.runtime import metadata, engine


async def pg_init_tables():
    async with engine.begin() as conn:
        print(metadata.sorted_tables)
        await conn.run_sync(metadata.drop_all)
        await conn.run_sync(metadata.create_all)

    async with engine.connect() as conn:

        result = await conn.execute(
            User.insert().returning(User.c.id), [{"name": "some name 1"}],
        )
        user_id = result.fetchone()[0]

        result = await conn.execute(
            Question.insert().returning(Question.c.id),
            [{"question": "some name 1", "answer": "answer", "score": 100}],
        )
        question_id = result.fetchone()[0]

        await conn.execute(
            Answer.insert(),
            [
                {
                    "value": "wrong",
                    "score": 0,
                    "user_id": user_id,
                    "question_id": question_id,
                },
                {
                    "value": "answer",
                    "score": 100,
                    "user_id": user_id,
                    "question_id": question_id,
                },
            ],
        )

        result = await conn.execute(select(Question))
        results = result.fetchall()
        print(results)

        result = await conn.execute(select(User))
        results = result.fetchall()
        print(results)
        await conn.commit()
        return


if __name__ == "__main__":
    asyncio.run(pg_init_tables())
