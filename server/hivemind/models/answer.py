from datetime import datetime

from sqlalchemy import Integer, Column, String, Float, DateTime, ForeignKey, Table

from hivemind.runtime import metadata

Answer = Table("answer", metadata,
    Column("id", Integer, primary_key=True),
    Column("value", String, nullable=False),
    Column("score", Float, nullable=False),
    Column("user_id", Integer, ForeignKey("user.id"), nullable=False),
    Column("question_id", Integer, ForeignKey("question.id"), nullable=False),
    Column("created_at", DateTime, default=datetime.utcnow)
)
