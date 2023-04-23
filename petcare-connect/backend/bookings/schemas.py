from app.schemas import CoreModel, DateTimeModelMixin
from typing import Optional
from enum import Enum
from datetime import datetime


class PaymentStatus(str, Enum):
    approved = "approved"
    pending = "pending"
    declined = "declined"
    
    
class BookingStatus(str, Enum):
    ongoing = "ongoing"
    completed = "completed"
    cancelled = "cancelled"
    

class BookingBase(CoreModel):   
    duration: float
    status: BookingStatus
    amount: float
    pet_id: int
    service_id: int
    payment_status: PaymentStatus
        
        
class BookingCreate(BookingBase):    
    pass

        
class BookingUpdate(DateTimeModelMixin, CoreModel):
    status: BookingStatus
    completed_at: Optional[datetime]


class Booking(BookingBase):
    petowner_id: int
    serviceprovider_id: int
        
    class Config:
        orm_mode = True
        
        
class BookingInDB(DateTimeModelMixin, Booking):
    transaction_id: Optional[str] = None
    stripe_token: Optional[str] = None
    
    class Config:
        orm_mode = True


class BookingPublic(DateTimeModelMixin, Booking):
    pass
           
    class Config:
        orm_mode = True
        
        
        
        