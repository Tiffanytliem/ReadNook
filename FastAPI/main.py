from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel 
from database import SessionLocal, engine 
import models 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)

class BooklogBase(BaseModel):
    title: str
    authors: str
    category: str
    summary: str
    quotes: str
    isbn: str

class BooklogModel(BooklogBase):
    id: int
    
    class Config: 
        orm_mode = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.post("/booklogs/", response_model=BooklogModel)
async def create_booklog(booklog: BooklogBase, db: db_dependency):
    db_booklog = models.Booklog(**booklog.dict())
    db.add(db_booklog)
    db.commit()
    db.refresh(db_booklog)
    return db_booklog