import uuid

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Integer, Float
from sqlalchemy.dialects.postgresql import UUID

from hivemind.models.mixin import TimeStampMixin
from hivemind.models.base import Base
from hivemind.models.user import User


class Message(Base, TimeStampMixin):
    # columns
    id = Column(Integer, primary_key=True)
    score = Column(Float, nullable=False)
    discussionId = Column(
        UUID(as_uuid=True), default=uuid.uuid4, unique=True, nullable=False
    )

    # relationships
    userId = Column(Integer, ForeignKey("user.id"), nullable=False)

    # TODO
    # score = Column(Float, nullable=False)
