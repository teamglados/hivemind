from datetime import datetime
import uuid

from sqlalchemy import Integer, Column, String, Float, DateTime, ForeignKey, Table
from sqlalchemy.dialects.postgresql import UUID

from hivemind.runtime import metadata

DiscussionItem = Table('discussion_item', metadata,
    Column("id", Integer, primary_key=True),
    Column("score", Float, nullable=False),
    Column("discussion_id", UUID(as_uuid=True), default=uuid.uuid4, unique=False, nullable=False),
    Column("question_id", Integer, ForeignKey("question.id"), nullable=False),
    Column("user_id", Integer, ForeignKey("user.id"), nullable=False),
    Column("created_at", DateTime, default=datetime.utcnow)
)
