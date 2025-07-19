from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Post, SessionLocal, Base, engine

API_KEY = "my-secret-api-key"

# Verify API key dependency
def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")

# DB Setup
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    return db.query(Post).all()

@app.post("/posts", dependencies=[Depends(verify_api_key)])
def create_post(post: dict, db: Session = Depends(get_db)):
    new_post = Post(title=post["title"], body=post["body"])
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@app.put("/posts/{post_id}", dependencies=[Depends(verify_api_key)])
def update_post(post_id: int, post: dict, db: Session = Depends(get_db)):
    existing_post = db.query(Post).filter(Post.id == post_id).first()
    if not existing_post:
        raise HTTPException(status_code=404, detail="Post not found")
    existing_post.title = post["title"]
    existing_post.body = post["body"]
    db.commit()
    db.refresh(existing_post)
    return existing_post




@app.delete("/posts/{post_id}", dependencies=[Depends(verify_api_key)])
def delete_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted successfully"}

