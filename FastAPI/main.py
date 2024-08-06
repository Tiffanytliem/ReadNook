from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel 
from database import SessionLocal, engine 
import models 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
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
async def create_booklogs(booklog: BooklogBase, db: db_dependency):
    db_booklog = models.Booklog(**booklog.dict())
    db.add(db_booklog)
    db.commit()
    db.refresh(db_booklog)
    return db_booklog


@app.get("/booklogs/", response_model=List[BooklogModel])
async def read_booklogs(db: db_dependency, skip: int = 0, limit: int = 100):
    booklogs = db.query(models.Booklog).offset(skip).limit(limit).all()
    return booklogs

@app.put("/booklogs/{booklog_id}", response_model=BooklogModel)
async def update_booklog(booklog_id: int, booklog: BooklogBase, db: Session = Depends(get_db)):
    db_booklog = db.query(models.Booklog).filter(models.Booklog.id == booklog_id).first()
    
    if db_booklog is None:
        raise HTTPException(status_code=404, detail="Booklog not found")
    
    for key, value in booklog.dict().items():
        setattr(db_booklog, key, value)
    
    db.commit()
    db.refresh(db_booklog)
    return db_booklog

@app.delete("/booklogs/{booklog_id}", response_model=BooklogModel)
async def delete_booklog(booklog_id: int, db: Session = Depends(get_db)):
    db_booklog = db.query(models.Booklog).filter(models.Booklog.id == booklog_id).first()
    if db_booklog is None:
        raise HTTPException(status_code=404, detail="Booklog not found")
    db.delete(db_booklog)
    db.commit()
    return db_booklog



