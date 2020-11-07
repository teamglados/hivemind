import asyncio

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import AsyncSession

from hivemind.models.user import User
from hivemind.config import SQLALCHEMY_DATABASE_URI

async def async_main():
    engine = create_async_engine(str(SQLALCHEMY_DATABASE_URI), echo=True)
    async with engine.begin() as conn:
        await conn.run_sync(User.metadata.drop_all)
        await conn.run_sync(User.metadata.create_all)

    async with AsyncSession(engine) as session:
        async with session.begin():
            session.add_all(
                [
                    User(name="moi"),
                ]
            )
        await session.commit()

asyncio.run(async_main())