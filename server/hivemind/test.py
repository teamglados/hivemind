from hivemind.config import *
from sqlalchemy.ext.asyncio import create_async_engine
import sqlalchemy

metadata = sqlalchemy.MetaData()
users = sqlalchemy.Table(
    'users', 
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String),
)

#engine = sqlalchemy.create_engine(SQLALCHEMY_DATABASE_URI)
#metadata.create_all(engine)

engine = create_async_engine(str(SQLALCHEMY_DATABASE_URI), echo=True)
