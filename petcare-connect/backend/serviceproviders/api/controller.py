from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from users import auth_service
from users.schemas import UserInDB, UserWithID, UserUpdate
from users.crud import get_user_by_id, get_user_by_username
from ..schemas import ServiceProviderCreate, ServiceProviderInDB, ServiceProviderPublic, ServiceProviderUpdate, Service, ServiceCreate, ServiceUpdate 
from ..crud import create_serviceprovider, get_serviceprovider_by_id, get_serviceprovider_by_address, update_serviceprovider, create_service, get_services, get_service_by_id, update_service, delete_service


router = APIRouter()


def logged_in(current_user = Depends(auth_service.get_current_user)):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You must be logged in to perform this action",
        )
    return current_user

@router.post(
    '/create-serviceprovider',
    tags=["serviceprovider registration"],
    description="Create a Service Provider profile",
    response_model=ServiceProviderPublic,
)
async def create_serviceprovider_profile(
    serviceprovider: ServiceProviderCreate,
    current_user: UserWithID = Depends(logged_in)
) -> ServiceProviderPublic:
    
    # Check if the current user is a petowner
    if current_user.user_type == 'serviceprovider':
        
        # Create the petowner profile
        return await create_serviceprovider(current_user.id, serviceprovider) 
    
    raise HTTPException(status_code=403, detail='Only service providers can create serviceprovider profile')



@router.get(
    '/me/',
    tags=["get my serviceprovider profile"],
    description="Get my service provider profile",
    response_model=ServiceProviderPublic,
)
async def get_serviceprovider_me(current_user: UserWithID = Depends(logged_in)) -> ServiceProviderPublic:
    # Get the petowner profile of the current user
    serviceprovider = await get_serviceprovider_by_id(current_user.id)

    if serviceprovider:
        return serviceprovider
    
    raise HTTPException(status_code=404, detail='PetOwner profile not found')


@router.get(
    '/{username}',
    tags=["get a serviceprovider profile"],
    description="Get a serviceprovider profile",
    response_model=ServiceProviderPublic
)
async def get_serviceprovider(username: str):
    # Get the petowner profile of the current user
    user = await get_user_by_username(username)
    serviceprovider = await get_serviceprovider_by_id(user.id)

    if serviceprovider:
        return serviceprovider
    
    raise HTTPException(status_code=404, detail='Service provider profile not found')

    
@router.get('/city/{address_city}',
            tags=["get a serviceprovider by city"], 
            description="Get a service provider profile by address", 
            response_model=List[ServiceProviderPublic]
           )
async def get_serviceprovider_by_city(address_city: str):
    return await get_serviceprovider_by_address(address_city)


    
@router.put("/update/{user_id}", 
            tags=["update a serviceprovider"], 
            description="Update serviceprovider profile", 
            response_model=Optional[ServiceProviderPublic]
           )
async def update_a_serviceprovider(user: UserUpdate, 
                                   serviceprovider: ServiceProviderUpdate, 
                                   current_user: UserWithID = Depends(logged_in)
                                  ):
    
    if current_user.user_type == "serviceprovider":
        return await update_serviceprovider(current_user.id, user, serviceprovider)
    
    raise HTTPException(status_code=403, detail='Only service provider can update their profile')


@router.post("/create-service/", 
             tags=["create a service"], 
             description="Create a service", 
             response_model=ServiceCreate
            )
async def create_a_service(
    service: ServiceCreate,
    current_user: UserWithID = Depends(logged_in)
):
    # Check if the user is a pet owner
    if current_user.user_type == 'serviceprovider':
        
        # Create a new service
        return await create_service(current_user.id, service)
         
    raise HTTPException(status_code=403, detail="User is not a Service provider")


@router.get("/me/services/", 
            tags=["get services"], 
            description="Get all my services",
            response_model=List[ServiceCreate])
async def get_my_services(
    current_user: UserWithID = Depends(logged_in)
):
    # Check if the user is a pet owner
    if current_user.user_type == 'serviceprovider':
        
        # Get the services for the current user
        services = await get_services(current_user.id)

        # Return the services
        return services   
    raise HTTPException(status_code=403, detail="User is not a service provider")
    
    
@router.get("/{username}/services/", 
            tags=["get services"], 
            description="Get all services for a user", 
            response_model=List[ServiceCreate])
async def get_user_services(username: str):
    
    # Get the services for the user
    user = await get_user_by_username(username)
    services = await get_services(user.id)

    # Return the services
    return services 

@router.get("/services/{service_id}/", 
            tags=["get a service"], 
            description="Get services details by id",
            response_model=Optional[ServiceCreate]
           )
async def get_a_service(service_id: int):
    return await get_service_by_id(service_id)


@router.put("/services/update/{service_id}", 
            tags=["update a service"], 
            description="Update service details", 
            response_model=Optional[ServiceUpdate]
           )
async def update_a_service(service_id: int, 
                       service: ServiceUpdate, 
                       current_user: UserWithID = Depends(logged_in)
                      ):
    if current_user.user_type == "serviceprovider":
        return await update_service(service_id, service, current_user.id)
    
    raise HTTPException(status_code=403, detail='Only serviceproviders can update their service details')


@router.delete("/services/delete/{service_id}", 
            tags=["delete a service"], 
            description="Delete service details",
            response_model=str
           )
async def delete_a_service(service_id: int,  
                       current_user: UserWithID = Depends(logged_in)
                      ):
    if current_user.user_type == "serviceprovider":
        return await delete_service(service_id, current_user.id)   
    
    raise HTTPException(status_code=403, detail='Only serviceproviders can delete their service details')






