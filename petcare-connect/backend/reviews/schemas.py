from app.schemas import CoreModel, DateTimeModelMixin
from typing import Optional
from datetime import datetime

class ReviewBase(CoreModel):   
    rating: int
    comment: str
            
        
class ReviewCreate(ReviewBase):    
    pass

        
class ReviewUpdate(DateTimeModelMixin, ReviewBase):
    updated_at: Optional[datetime]


class Review(ReviewBase):
    petowner_id: int
    booking_id: int
        
        
class ReviewInDB(DateTimeModelMixin, Review):
    serviceprovider_id: int
    
    class Config:
        orm_mode = True

        
class ReviewPublic(DateTimeModelMixin, Review):
    
    class Config:
        orm_mode = True