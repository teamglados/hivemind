from hivemind.runtime import *

async def call_service_method(func, *args, **kwargs):
    async with AsyncSession(engine) as session:
        result = await session.run_sync(func, *args, **kwargs)
        try:
            await session.commit()
        except sqlalchemy.exc.ResourceClosedError:
            pass
        return result

