from sqlalchemy.sql import text
from sqlalchemy.ext.asyncio import create_async_engine
import sqlalchemy
from sqlalchemy import MetaData
import asyncio

from hivemind.config import *
from hivemind.config import SQLALCHEMY_DATABASE_URI

metadata = MetaData()
engine = create_async_engine(str(SQLALCHEMY_DATABASE_URI), echo=True)