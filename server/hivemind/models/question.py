from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Integer, Float

from hivemind.models.mixin import TimeStampMixin
from hivemind.models.base import Base


class Question(Base, TimeStampMixin):
    # columns
    id = Column(Integer, primary_key=True)
    question = Column(String, nullable=False)
    answer = Column(String, nullable=False)
    score = Column(Float, nullable=False)
    tags = Column(String)

