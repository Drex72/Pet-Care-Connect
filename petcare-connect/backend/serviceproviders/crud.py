from fastapi import HTTPException
from typing import Optional, List
from sqlalchemy import and_
from users.schemas import UserType, UserUpdate
from users.crud import get_user_by_id
from .schemas import Service, ServiceCreate, ServiceUpdate, ServiceInDB, ServiceProviderCreate, ServiceProviderInDB, ServiceProviderUpdate, ServiceProviderPublic


async def create_serviceprovider(user_id: int, serviceprovider: ServiceProviderCreate) -> ServiceProviderInDB:
    from .models import ServiceProvider
    
    # Get the user object from the database
    user = await get_user_by_id(user_id)
    usertype = user.user_type
    
    if user:
        if usertype == UserType.serviceprovider:
            # We extend our ServiceProviderCreate with the user_id
            new_serviceprovider = serviceprovider.copy(update={"user_id": user_id, "first_name": user.first_name, "last_name": user.last_name})
        
            # Insert the new serviceprovider record into the database
            new_serviceprovider_created = await ServiceProvider.create(**new_serviceprovider.dict())

            # Return a ServiceProviderInDB object representing the newly created record
            return ServiceProviderInDB.from_orm(new_serviceprovider_created)
        
        raise HTTPException(status_code=404, detail="Only serviceproviders can create serviceprovider account")
    
    raise HTTPException(status_code=404, detail="User not found")

    
async def get_serviceprovider_by_id(serviceprovider_id: int) -> Optional[ServiceProviderPublic]:
    from .models import ServiceProvider
    
    serviceprovider = await ServiceProvider.query.where(ServiceProvider.user_id == serviceprovider_id).gino.first()
    
    if not serviceprovider:
        raise HTTPException(status_code=404, detail="Serviceprovider profile does not exist")
        
    return serviceprovider


async def get_serviceprovider_by_address(address_city: str) -> List[ServiceProviderPublic]:
    from .models import ServiceProvider
    
    serviceproviders = await ServiceProvider.query.where(ServiceProvider.address_city == address_city).gino.all()
    
    if not serviceproviders:
        raise HTTPException(status_code=404, detail=f"We don't have serviceprovider in {address_city} yet")
        
    return [serviceprovider.__values__ for serviceprovider in serviceproviders]


async def update_serviceprovider(user_id: int, 
                                 user: UserUpdate, 
                                 serviceprovider: ServiceProviderUpdate
                                ) -> Optional[ServiceProviderPublic]:
    from users.models import User
    from .model import ServiceProvider
    
    user_data = user.dict(exclude_unset=True)
    serviceprovider_data = serviceprovider.dict(exclude_unset=True)
    
    updated_user = await User.update.values(**user_data).where(User.id == user_id).gino.status()
    updated_serviceprovider = await ServiceProviderOwner.update.values(**serviceprovider_data).where(ServiceProvider.user_id == user_id).gino.status()
    
    serviceprovider = await ServiceProvider.query.where(ServiceProvider.user_id == user_id).gino.first()
    
    if not updated_serviceprovider:
        raise HTTPException(status_code=404, detail="Service provider details cannot be updated or doesn't exist")
    
    return serviceprovider.__values__




"""    ***CRUD (Create, Read, Update, Delete) Operations for services below***      """


async def create_service(provider_id: int, service: ServiceCreate) -> ServiceInDB:
    from .models import Service
    
    # Get the user object from the database
    user = await get_user_by_id(provider_id)
    service_user = await get_serviceprovider_by_id(provider_id)
    
    if user:
        if service_user:
            # We extend our ServiceCreate with the user_id
            new_service = service.copy(update={"provider_id": provider_id})
        
            # Insert the new Service record into the database
            new_service_created = await Service.create(**new_service.dict())

            # Return a ServiceInDB object representing the newly created record
            return ServiceInDB.from_orm(new_service_created)
        
        raise HTTPException(status_code=403, detail='You need to add serviceprovider profile before creating services')
    
    raise HTTPException(status_code=404, detail="User account not found")


async def get_services(provider_id: int) -> List[ServiceCreate]:
    from .models import Service
    
    services = await Service.query.where(Service.provider_id == provider_id).gino.all()
    
    if not services:
        raise HTTPException(status_code=404, detail="No services found for the user")
        
    return [service.__values__ for service in services]


async def get_service_by_id(service_id: int) -> Optional[ServiceInDB]:
    from .models import Service
    
    service = await Service.query.where(Service.id == service_id).gino.first()
    
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
        
    return service.__values__


async def get_my_service_details(name: str, provider_id: int) -> Optional[ServiceCreate]:
    from .models import Service
    
    service = await Service.query.where(and_(Service.name == name, Service.provider_id == provider_id)).gino.first()
    
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
        
    return service


async def update_service(service_id: int, service: ServiceUpdate, provider_id: int) -> Optional[Service]:
    from .models import Service
    
    service_data = service.dict(exclude_unset=True)
    
    updated_service = await Service.update.values(**service_data).where(and_(Service.id == service_id, Service.provider_id == provider_id)).gino.status()
    
    service = await Service.query.where(Service.id == service_id).gino.first()
    
    if not updated_service:
        raise HTTPException(status_code=404, detail="Service details cannot be updated or doesn't exist")
    
    return service.__values__


async def delete_service(service_id: int, provider_id: int) -> str:
    from .models import Service
    
    deleted_service = await Service.delete.where(and_(Service.id == service_id, Service.provider_id == provider_id)).gino.status()
    
    if not deleted_service:
        raise HTTPException(status_code=404, detail="Service details cannot be deleted or doesn't exist")
        
    return "Service details successfully deleted"

    
    

    
    
    
    
    


    
    
    
    

