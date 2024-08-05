from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class Booklog(Base):
    __tablename__ = 'booklogs'

    title = Column(String)
    authors = Column(String)
    category = Column(String)
    summary = Column(String)
    quotes = Column(String)
    isbn = Column(String)
    