from sqlalchemy.sql import text
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import MetaData
import sqlalchemy
import asyncio

from hivemind.config import *

metadata = MetaData()
engine = create_async_engine(str(SQLALCHEMY_DATABASE_URI), echo=True)
