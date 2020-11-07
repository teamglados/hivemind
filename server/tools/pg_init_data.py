from sqlalchemy.sql import select
from sqlalchemy import MetaData
import argparse
import asyncio
import json

from hivemind.models import *
from hivemind.config import SQLALCHEMY_DATABASE_URI
from hivemind.runtime import metadata, engine

def create_user_items(*names, idstart=1):
    items = list()
    uid = idstart
    for name in names:
        items.append(dict(
            id=uid,
            name=name,
            active_question_id=None,
            active_question_last_active=None
        ))
        uid += 1
    return items

async def pg_init_tables():
    """ drop and re-initialize all tables described by metadata """
    async with engine.begin() as conn:
        await conn.run_sync(metadata.drop_all)
        await conn.run_sync(metadata.create_all)

async def pg_init_tables_data(dummy_data_dict):
    """ initialize table data """ 
    async with engine.connect() as conn:

        await conn.execute(
            User.insert(),
            create_user_items(*dummy_data_dict.pop('names'))
        )

        await conn.execute(
            Question.insert(),
            dummy_data_dict.get('questions')
        )

        await conn.execute(
            Hint.insert(),
            dummy_data_dict.get('hints')
        )
        
        await conn.execute(
            HintItem.insert(),
            dummy_data_dict.get('hint_items')
        )
        
        await conn.execute(
            DiscussionItem.insert(),
            dummy_data_dict.get('discussion_items')
        )

        await conn.execute(
            Message.insert(),
            dummy_data_dict.get('messages')
        )

        # Example: returning creation id
        #result = await conn.execute(
        #    User.insert().returning(User.c.id), [{"name": "some name 1"}],
        #)
        #user_id = result.fetchone()[0]

        await conn.commit()
        return

async def pg_run_all(dummy_data_dict=None):
    print('Initialize tables...')
    await pg_init_tables()

    if dummy_data_dict is not None:
        print('Initialize dummy data...')
        await pg_init_tables_data(dummy_data_dict)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='HiveMind database init tools')
    parser.add_argument(
        "--dummy",
        help="input dummy data filename",
        type=str,
        default=None,
        required=False,
    )
    args = parser.parse_args()
    dummy_data_dict = None

    if args.dummy:
        with open(args.dummy, "r") as jsonfile:
            dummy_data_dict = json.load(jsonfile)
    
    asyncio.run(pg_run_all(dummy_data_dict))
