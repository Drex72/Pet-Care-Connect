from fastapi import HTTPException
from typing import Optional, List
from sqlalchemy import and_
from users.crud import get_user_by_id
from petowners.crud import get_petowner_by_id
from serviceproviders.crud import get_service_by_id, get_serviceprovider_by_id
from .schemas import BookingPublic, BookingCreate, BookingUpdate, BookingInDB


async def create_booking(user_id: int, booking: BookingCreate) -> BookingInDB:
    from .models import Booking
    
    # Get the user object from the database
    user = await get_user_by_id(user_id)
    pet_owner = await get_petowner_by_id(user_id)
    service_id = booking.service_id
    service_provider = await get_service_by_id(service_id)
    
    if user:
        if pet_owner:
            # We extend our BookingCreate with the user_id
            new_booking = booking.copy(update={"petowner_id": user_id, "serviceprovider_id": service_provider.provider_id})
        
            # Insert the new booking record into the database
            new_booking_created = await Booking.create(**new_booking.dict())

            # Return a BookingInDB object representing the newly created record
            return BookingInDB.from_orm(new_booking_created)
        
        raise HTTPException(status_code=403, detail='You need to add petowner profile before booking')
    
    raise HTTPException(status_code=404, detail="User not found")

    
async def get_booking_by_id(booking_id: int) -> Optional[BookingPublic]:
    from .models import Booking
    
    booking = await Booking.query.where(Booking.id == booking_id).gino.first()
    return booking


# Get all the bookings for either a petowner or serviceprovider
async def get_all_bookings(user_id: int) -> List[BookingPublic]:
    from .models import Booking
    
    # Get the user object from the database
    user = await get_user_by_id(user_id)
    pet_owner = await get_petowner_by_id(user_id)
    service_provider = await get_serviceprovider_by_id(user_id)
    
    if user:
        if pet_owner:
            bookings = await Booking.query.where(Booking.petowner_id == user_id).gino.all()
        elif service_provider:
            bookings = await Booking.query.where(Booking.serviceprovider_id == user_id).gino.all()
        
    raise HTTPException(status_code=404, detail="User not found")
    
    if not bookings:
        raise HTTPException(status_code=404, detail="No booking found for the user")
        
    # Convert the dicts to PetBase models    
    return [booking.__values__ for booking in bookings]


async def update_booking(booking_id: int, booking: BookingUpdate, owner_id: int) -> Optional[BookingPublic]:
    from .models import Booking
    
    booking_data = booking.dict(exclude_unset=True)
    
    updated_booking = await Booking.update.values(**booking_data).where(and_(Booking.id == booking_id, Booking.owner_id == owner_id)).gino.status()
    
    booking = await Booking.query.where(Booking.id == booking_id).gino.first()
    
    if not updated_booking:
        raise HTTPException(status_code=404, detail="Booking details cannot be updated or doesn't exist")
    
    return booking.__values__















