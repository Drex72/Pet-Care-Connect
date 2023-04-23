from fastapi import HTTPException
from typing import Optional, List
from sqlalchemy import and_
from users.crud import get_user_by_id
from petowners.crud import get_petowner_by_id
from serviceproviders.crud import get_service_by_id, get_serviceprovider_by_id
from bookings.crud import get_booking_by_id
from .schemas import ReviewCreate, ReviewUpdate, ReviewInDB, ReviewPublic


async def create_review(user_id: int, booking_id: int, review: ReviewCreate) -> ReviewInDB:
    from .models import Review
    
    # Get the user object from the database
    user = await get_user_by_id(user_id)
    pet_user = await get_petowner_by_id(user_id)
    booking = await get_booking_by_id(booking_id)
    
    if user:
        if pet_user and booking:
            # We extend our ReviewCreate with the user_id
            new_review = review.copy(update={"petowner_id": user_id, 
                                             "booking_id": booking_id, 
                                             "serviceprovider_id": booking.serviceprovider_id
                                            })
        
            # Insert the new pet record into the database
            new_review_created = await Review.create(**new_review.dict())

            # Return a PetInDB object representing the newly created record
            return ReviewInDB.from_orm(new_review_created)
        
        raise HTTPException(status_code=403, detail='You need to add petowner profile and book before review')
    
    raise HTTPException(status_code=404, detail="User not found")

    
async def get_review_by_id(review_id: int) -> Optional[ReviewPublic]:
    from .models import Review
    
    review = await Review.query.where(Review.id == review_id).gino.first()
    return review


# Get all the reviews for a user
async def get_all_reviews(user_id: int) -> List[ReviewPublic]:
    from .models import Review
    
    # Get the user object from the database
    user = await get_user_by_id(user_id)
    pet_owner = await get_petowner_by_id(user_id)
    service_provider = await get_serviceprovider_by_id(user_id)
    
    if user:
        if pet_owner:
            reviews = await Review.query.where(Review.petowner_id == user_id).gino.all()
        elif service_provider:
            reviews = await Review.query.where(Review.serviceprovider_id == user_id).gino.all()
        
    raise HTTPException(status_code=404, detail="User not found")
    
    if not reviews:
        raise HTTPException(status_code=404, detail="No review found for the user")
        
    # Return the dicts in ReviewPublic schema 
    return [review.__values__ for review in reviews]


async def update_review(review_id: int, review: ReviewUpdate, petowner_id: int) -> Optional[ReviewPublic]:
    from .models import Review
    
    review_data = review.dict(exclude_unset=True)
    
    updated_review = await Review.update.values(**review_data).where(and_(Review.id == review_id, Review.petowner_id == petowner_id)).gino.status()
    
    review = await Review.query.where(Review.id == review_id).gino.first()
    
    if not updated_review:
        raise HTTPException(status_code=404, detail="Review details cannot be updated or doesn't exist")
    
    return review.__values__


async def delete_review(review_id: int, petowner_id: int) -> str:
    from .models import Review
    
    deleted_review = await Review.delete.where(and_(Review.id == review_id, Review.petowner_id == petowner_id)).gino.status()
    
    if not deleted_review:
        raise HTTPException(status_code=404, detail="Review details cannot be deleted or doesn't exist")
        
    return "Review details successfully deleted"











