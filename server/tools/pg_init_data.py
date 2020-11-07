import asyncio

from sqlalchemy.sql import text
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import AsyncSession

from hivemind.models.user import User
from hivemind.models.hint import Hint
from hivemind.models.hint_item import HintItem
from hivemind.models.question import Question
from hivemind.models.answer import Answer
from hivemind.models.message import Message
from hivemind.models.discussion_item import DiscussionItem
from hivemind.config import SQLALCHEMY_DATABASE_URI

engine = create_async_engine(str(SQLALCHEMY_DATABASE_URI), echo=True)

async def pg_init_tables():
    async with engine.begin() as conn:
        # question
        await conn.run_sync(Question.metadata.drop_all)
        await conn.run_sync(Question.metadata.create_all)

        # user
        await conn.run_sync(User.metadata.drop_all)
        await conn.run_sync(User.metadata.create_all)

        # hint
        await conn.run_sync(Hint.metadata.drop_all)
        await conn.run_sync(Hint.metadata.create_all)

        # answer
        await conn.run_sync(Answer.metadata.drop_all)
        await conn.run_sync(Answer.metadata.create_all)

        # message
        await conn.run_sync(Message.metadata.drop_all)
        await conn.run_sync(Message.metadata.create_all)

        # Discussion item
        await conn.run_sync(DiscussionItem.metadata.drop_all)
        await conn.run_sync(DiscussionItem.metadata.create_all)

        # Hint item
        await conn.run_sync(HintItem.metadata.drop_all)
        await conn.run_sync(HintItem.metadata.create_all)

async def pg_create_test():
    async with AsyncSession(engine) as session:
        async with session.begin():
            session.add_all(
                [
                    User(name="test"),
                ]
            )
        await session.commit()

if __name__ == '__main__':
    asyncio.run(pg_init_tables())
