# schemas.py
from pydantic import BaseModel

class PostSchema(BaseModel):
    id: int
    title: str
    body: str

    class Config:
        orm_mode = True  # Tells Pydantic to read data from ORM objects
