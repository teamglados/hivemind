from datetime import datetime

from sqlalchemy import Integer, Column, String, Float, DateTime, ForeignKey, Table

from hivemind.runtime import metadata

HintItem = Table("hint_item", metadata,
    Column("id", Integer, primary_key=True),
    Column("score", Float, nullable=False),
    Column("user_id", Integer, ForeignKey("user.id"), nullable=False),
    Column("hint_id", Integer, ForeignKey("hint.id"), nullable=False),
    Column("created_at", DateTime, default=datetime.utcnow)
)
