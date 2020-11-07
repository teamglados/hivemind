from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Integer, Float, Table

from hivemind.runtime import metadata

Question = Table("question", metadata,
    Column("id", Integer, primary_key=True),
    Column("question", String, nullable=False),
    Column("answer", String, nullable=False),
    Column("score", Float, nullable=False),
    Column("created_at", DateTime, default=datetime.utcnow)
)
