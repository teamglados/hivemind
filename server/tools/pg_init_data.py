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

        await conn.execute(
            User.insert(), [{"name": "some name 1"}, {"name": "some name 2"}]
        )

        result = await conn.execute(select(User).where(User.c.name == "some name 1"))
        result = await conn.execute(select(User).where(User.c.name == "some name 1"))

        return result.fetchall()


if __name__ == '__main__':
    asyncio.run(pg_init_tables())
