from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Integer, MetaData, Table
from sqlalchemy.dialects.postgresql import UUID

from hivemind.runtime import metadata

User = Table("user", metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("active_question_id", Integer, ForeignKey("question.id"), nullable=True),
    Column("active_question_last_active", DateTime, nullable=True),
    Column("active_discussion_id", UUID(as_uuid=True), nullable=True),
    Column("created_at", DateTime, default=datetime.utcnow)
)
