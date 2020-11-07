"""
From:
https://github.com/Netflix/dispatch/blob/13aa01957b1d41d9620a8c0d217c220356c4b1f8/src/dispatch/config.py
"""

from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")

# database
DATABASE_HOSTNAME = config("DATABASE_HOSTNAME", default="localhost")
DATABASE_CREDENTIALS = config("DATABASE_CREDENTIALS", cast=Secret, default="postgres:postgres")
DATABASE_NAME = config("DATABASE_NAME", default="prod")
DATABASE_PORT = config("DATABASE_PORT", default="5432")
SQLALCHEMY_DATABASE_URI = f"postgresql+asyncpg://{DATABASE_CREDENTIALS}@{DATABASE_HOSTNAME}:{DATABASE_PORT}/{DATABASE_NAME}"