from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Integer, Float

from hivemind.models.mixin import TimeStampMixin
from hivemind.models.base import Base
from hivemind.models.user import User


class Question(Base, TimeStampMixin):
    # columns
    id = Column(Integer, primary_key=True)
    value = Column(String, nullable=False)
    score = Column(Float, nullable=False)

    # relationships
    userId = Column(Integer, ForeignKey("user.id"), nullable=False)
    questionId = Column(Integer, ForeignKey("question.id"), nullable=False)
