from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Post, SessionLocal, Base, engine

# DB Setup
Base.metadata.create_all(bind=engine)


# Allow frontend to call backend APIs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    return db.query(Post).all()

@app.post("/posts")
def create_post(post: dict, db: Session = Depends(get_db)):
    new_post = Post(title=post["title"], body=post["body"])
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post
