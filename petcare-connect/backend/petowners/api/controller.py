from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from users import auth_service
from users.schemas import UserInDB, UserWithID, UserUpdate
from users.crud import get_user_by_id, get_user_by_username
from ..schemas import PetOwnerCreate, PetOwnerInDB, PetOwnerPublic, PetOwnerUpdate, Pet, PetCreate, PetBase, PetUpdate
from ..crud import create_petowner, update_petowner, get_petowner_by_id, create_pet, get_pets, get_my_pet_details, get_pet_by_id, update_pet, delete_pet


router = APIRouter()


def logged_in(current_user = Depends(auth_service.get_current_user)):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You must be logged in to perform this action",
        )
    return current_user

@router.post(
    '/create',
    tags=["create petowner profile"],
    description="Create a PetOwner profile",
    response_model=PetOwnerPublic,
)
async def create_petowner_profile(
    petowner: PetOwnerCreate,
    current_user: UserWithID = Depends(logged_in)
) -> PetOwnerPublic:
    
    # Check if the current user is a petowner
    if current_user.user_type == 'petowner':
        
        # Create the petowner profile
        return await create_petowner(current_user.id, petowner)
    
    raise HTTPException(status_code=403, detail='Only petowners can create petowner profile')



@router.get(
    '/me/',
    tags=["get my petowner profile"],
    description="Get my PetOwner profile",
    response_model=PetOwnerPublic,
)
async def get_petowner_me(current_user: UserInDB = Depends(logged_in)) -> PetOwnerPublic:
    # Get the petowner profile of the current user
    petowner = await get_petowner_by_id(current_user.id)

    if petowner:
        return petowner
    
    raise HTTPException(status_code=404, detail='PetOwner profile not found')


@router.get(
    '/{username}/',
    tags=["get a petowner profile"],
    description="Get a PetOwner profile",
    response_model=PetOwnerPublic,
)
async def get_petowner(username: str) -> PetOwnerPublic:
    # Get the petowner profile of the current user
    user = await get_user_by_username(username)
    petowner = await get_petowner_by_id(user.id)

    if petowner:
        return petowner
    
    raise HTTPException(status_code=404, detail='PetOwner profile not found')
    
    
@router.put("/update/{user_id}", 
            tags=["update a petowner"], 
            description="Update petowner profile", 
            response_model=Optional[PetOwnerPublic]
           )
async def update_a_petowner(user: UserUpdate, 
                            petowner: PetOwnerUpdate, 
                            current_user: UserWithID = Depends(logged_in)
                           ):
    if current_user.user_type == "petowner":
        return await update_petowner(current_user.id, user, petowner)
    
    raise HTTPException(status_code=403, detail='Only petowners can update their profile')
    

    
@router.post("/pets/create/", 
             tags=["create a pet"], 
             description="Add a pet", 
             response_model=PetCreate
            )
async def create_pet_profile(
    pet: PetCreate,
    current_user: UserWithID = Depends(logged_in)
):
    # Check if the user is a pet owner
    if current_user.user_type == 'petowner':
        
        # Create a new pet
        return await create_pet(current_user.id, pet)

    raise HTTPException(status_code=403, detail="User is not a pet owner")


@router.get("/me/pets/", 
            tags=["get my pets"], 
            description="Get my pets", 
            response_model=List[PetBase]
           )
async def get_my_pet(
    current_user: UserWithID = Depends(logged_in)
):
    # Check if the current user is a petowner
    if current_user.user_type == 'petowner':
        
        # Get the pets for the current user
        pets = await get_pets(current_user.id)

        # Return the pets
        return pets   
    raise HTTPException(status_code=403, detail="User is not a pet owner")
    
    
@router.get("/{username}/pets/", 
            tags=["get user pets"], 
            description="Get pets for a user", 
            response_model=List[PetBase]
           )
async def get_user_pet(username: str):
    # Get the pets for the current user
    user = await get_user_by_username(username)
    
    return await get_pets(user.id)


@router.get("/pets/{pet_id}/", 
            tags=["get a pet"], 
            description="Get pet details by id",
            response_model=Optional[Pet]
           )
async def get_a_pet(pet_id: int):
    return await get_pet_by_id(pet_id)


@router.put("/pets/update/{pet_id}", 
            tags=["update a pet"], 
            description="Update pet details", 
            response_model=Optional[PetBase]
           )
async def update_a_pet(pet_id: int, 
                       pet: PetUpdate, 
                       current_user: UserWithID = Depends(logged_in)
                      ):
    if current_user.user_type == "petowner":
        return await update_pet(pet_id, pet, current_user.id)
    
    raise HTTPException(status_code=403, detail='Only petowners can update their pet details')


@router.delete("/pets/delete/{pet_id}", 
            tags=["delete a pet"], 
            description="Delete pet details",
            response_model=str
           )
async def delete_a_pet(pet_id: int,  
                       current_user: UserWithID = Depends(logged_in)
                      ):
    if current_user.user_type == "petowner":
        return await delete_pet(pet_id, current_user.id)
    
    raise HTTPException(status_code=403, detail='Only petowners can delete their pet details')
    
  
    

