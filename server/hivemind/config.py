"""
From:
https://github.com/Netflix/dispatch/blob/13aa01957b1d41d9620a8c0d217c220356c4b1f8/src/dispatch/config.py
"""

from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")

# database
DATABASE_HOSTNAME = config("DATABASE_HOSTNAME", default="asdasd")
DATABASE_CREDENTIALS = config("DATABASE_CREDENTIALS", cast=Secret, default="asdasd")
DATABASE_NAME = config("DATABASE_NAME", default="dispatch")
DATABASE_PORT = config("DATABASE_PORT", default="5432")
SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DATABASE_CREDENTIALS}@{DATABASE_HOSTNAME}:{DATABASE_PORT}/{DATABASE_NAME}"