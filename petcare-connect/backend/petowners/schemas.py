from typing import List, Optional
from fastapi import HTTPException
from pydantic import validator
from app.schemas import CoreModel, DateTimeModelMixin
from users.schemas import UserType 
from datetime import date, datetime

class PetBase(CoreModel):
    name: str
    breed: str
    birthdate: date
    gender: str
            
        
class PetCreate(PetBase):
    
    @validator("birthdate", pre=True)
    def check_date(cls, value):
        try:
            # Parse the date string using the datetime.strptime method
            date_object = datetime.strptime(value, '%d-%m-%Y')   
    
            # Use the date object
            return date_object
        except ValueError:
            # Handle the case where the date format is incorrect
            raise HTTPException(status_code=403, detail='Invalid date format')

        
class PetUpdate(DateTimeModelMixin, PetCreate):
    updated_at: Optional[datetime]


class Pet(PetBase):
    owner_id: int
        
        
class PetInDB(DateTimeModelMixin, Pet):
    pass
    
    class Config:
        orm_mode = True


class PetOwnerBase(CoreModel):
    phone_number: str
    address_street: str
    address_city: str
    address_state: str
    address_postalcode: str
        

class PetOwnerCreate(PetOwnerBase):
    pass


class PetOwnerUpdate(DateTimeModelMixin, PetOwnerBase):
    updated_at: Optional[datetime]


class PetOwner(PetOwnerBase):
    user_id: int
    first_name: str
    last_name: str
        
    @validator("user_type", pre=True, check_fields=False)
    def user_type_is_petowner(cls, value):
        if value != UserType.petowner:
            raise ValueError("User is not a pet owner")
        return value
    
    class Config:
        orm_mode = True
        

class PetOwnerInDB(DateTimeModelMixin, PetOwner):
    pass
    
    class Config:
        orm_mode = True
        
        
class PetOwnerPublic(PetOwnerBase):
    first_name: str
    last_name: str

    class Config:
        orm_mode = True

        
class PetOwnerWithPets(PetOwner):
    pets: List[Pet] = []

    class Config:
        orm_mode = True       
