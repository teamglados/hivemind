from sqlalchemy.sql import text
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import AsyncSession
import sqlalchemy
import asyncio

from hivemind.models import *
from hivemind.config import *

engine = create_async_engine(str(SQLALCHEMY_DATABASE_URI), echo=True)
