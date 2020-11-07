from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Integer

from hivemind.models.mixin import TimeStampMixin
from hivemind.models.base import Base


class User(Base, TimeStampMixin):
    # columns
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    active_question_last_active = Column(DateTime, nullable=True)

    # relationships
    active_question_id = Column(Integer, ForeignKey("question.id"), nullable=True)

