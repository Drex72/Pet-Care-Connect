from typing import List, Optional
from pydantic import validator
from app.schemas import CoreModel, DateTimeModelMixin
from users.schemas import UserType 
from datetime import datetime


class ServiceBase(CoreModel):
    name: str
    description: str
    price: float


class ServiceCreate(ServiceBase):
    pass

        
class ServiceUpdate(DateTimeModelMixin, ServiceBase):
    updated_at: Optional[datetime]


class Service(ServiceBase):
    provider_id: int

        
class ServiceInDB(DateTimeModelMixin, Service):
    pass

    class Config:
        orm_mode = True
        

class ServiceProviderBase(CoreModel):
    phone_number: str
    address_street: str
    address_city: str
    address_state: str
    address_postalcode: str

        
class ServiceProviderCreate(ServiceProviderBase):
    pass


class ServiceProviderUpdate(ServiceProviderBase):
    updated_at: Optional[datetime]


class ServiceProvider(ServiceProviderBase):
    user_id: int
    first_name: str
    last_name: str
        
    @validator("user_type", pre=True, check_fields=False)
    def user_type_is_serviceprovider(cls, value):
        if value != UserType.serviceprovider:
            raise ValueError("User must be a service provider")
        return value

    class Config:
        orm_mode = True

        
class ServiceProviderInDB(DateTimeModelMixin, ServiceProvider):
    pass
    
    class Config:
        orm_mode = True

        
class ServiceProviderPublic(ServiceProviderBase):
    first_name: str
    last_name: str

    class Config:
        orm_mode = True
        

class ServiceProviderWithServices(ServiceProvider):
    services: List[Service] = []

    class Config:
        orm_mode = True  
        
        
        
        
        
        
        
        
        
        
        
        