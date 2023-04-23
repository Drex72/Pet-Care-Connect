from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from reviews.schemas import ReviewCreate, ReviewInDB, ReviewPublic, ReviewUpdate
from users.schemas import UserWithID
from users.crud import get_user_by_username
from reviews.crud import create_review, get_review_by_id, get_all_reviews, update_review, delete_review
from users import auth_service

router = APIRouter()


def logged_in(current_user = Depends(auth_service.get_current_user)):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You must be logged in to perform this action",
        )
    return current_user

@router.post(
    '/create-review',
    tags=["create a review"],
    description="Review a service",
    response_model=ReviewInDB,
)
async def create_reviews(
    review: ReviewCreate,
    booking_id: int,
    current_user: UserWithID = Depends(logged_in)
) -> ReviewInDB:
    
    # Check if the current user is a petowner
    if current_user.user_type == 'petowner':
        
        # Create a review
        return await create_review(current_user.id, booking_id, review)
    
    raise HTTPException(status_code=403, detail='Only petowners can create reviews')


@router.get("/me", 
            tags=["get reviews"], 
            description="Get all my reviews", 
            response_model=List[ReviewPublic])
async def get_my_review(
    current_user: UserWithID = Depends(logged_in)
):
    # Get all the reviews for the current user
    reviews = await get_all_reviews(current_user.id)

    # Return the reviews
    return reviews   
    
    
@router.get("/{username}/", 
            tags=["get reviews"], 
            description="Get all reviews for a user", 
            response_model=List[ReviewPublic])
async def get_user_review(username: str):
    # Get all the reviews for the user
    user = await get_user_by_username(username)
    
    # Return the reviews
    return await get_all_reviews(user.id)


@router.get("/{review_id}/", 
            tags=["get a review"], 
            description="Get review by id", 
            response_model=List[ReviewPublic])
async def get_review(review_id: int):

    # Return the particular review
    return await get_review_by_id(review_id)


@router.put("/update/{review_id}", 
            tags=["update a review"], 
            description="Update a review details", 
            response_model=Optional[ReviewPublic]
           )
async def update_a_review(review_id: int, 
                       review: ReviewUpdate, 
                       current_user: UserWithID = Depends(logged_in)
                      ):
    if current_user.user_type == "petowner":
        return await update_review(review_id, review, current_user.id)
    
    raise HTTPException(status_code=403, detail='Only petowners can update reviews')


@router.delete("/delete/{review_id}", 
            tags=["delete a review"], 
            description="Delete review details",
            response_model=str
           )
async def delete_a_review(review_id: int,  
                       current_user: UserWithID = Depends(logged_in)
                      ):
    if current_user.user_type == "petowner":
        return await delete_review(review_id, current_user.id)
    
    raise HTTPException(status_code=403, detail='Only petowners can delete reviews')
    
    
    
  
    






