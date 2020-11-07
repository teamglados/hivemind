from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Integer, Float

from hivemind.models.mixin import TimeStampMixin
from hivemind.models.base import Base
from hivemind.models.user import User


class HintItem(Base, TimeStampMixin):
    # columns
    id = Column(Integer, primary_key=True)
    score = Column(Float, nullable=False)

    # relationships
    hint_id = Column(Integer, ForeignKey("hint.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
