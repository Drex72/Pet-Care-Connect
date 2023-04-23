from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from bookings.schemas import BookingCreate, BookingInDB, BookingPublic, BookingUpdate
from users.schemas import UserWithID
from users.crud import get_user_by_username
from bookings.crud import create_booking, get_booking_by_id, get_all_bookings, update_booking
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
    '/create-booking',
    tags=["create a booking"],
    description="Book a service",
    response_model=BookingInDB,
)
async def create_bookings(
    booking: BookingCreate,
    current_user: UserWithID = Depends(logged_in)
) -> BookingInDB:
    
    # Check if the current user is a petowner
    if current_user.user_type == 'petowner':
        
        # Create the petowner profile
        return await create_booking(current_user.id, booking)
    
    raise HTTPException(status_code=403, detail='Only petowners can create bookings')



@router.get("/me/", 
            tags=["get my bookings"], 
            description="Get all my bookings",
            response_model=List[BookingPublic])
async def get_my_bookings(
    current_user: UserWithID = Depends(logged_in)
):
    # Get all the bookings for the current user
    bookings = await get_all_bookings(current_user.id)

    # Return the bookings
    return bookings   
    
    
    
@router.get("/{username}/", 
            tags=["get bookings"], 
            description="Get all bookings for a user",
            response_model=List[BookingPublic])
async def get_user_bookings(username: str):
    # Get all the booking for the user
    user = await get_user_by_username(username)
    
    # Return the bookings
    return await get_all_bookings(user.id)


@router.get("/{booking_id}/", 
            tags=["get a booking"], 
            description="Get a booking by id",
            response_model=List[BookingPublic])
async def get_a_booking(booking_id: int):

    # Return the bookings
    return await get_booking_by_id(booking_id)


@router.put("/update/{booking_id}", 
            tags=["update a booking"], 
            description="Update booking details", 
            response_model=Optional[BookingPublic]
           )
async def update_a_booking(booking_id: int, 
                       booking: BookingUpdate, 
                       current_user: UserWithID = Depends(logged_in)
                      ):
    return await update_booking(booking_id, booking, current_user.id)
    
    
    
  
    

