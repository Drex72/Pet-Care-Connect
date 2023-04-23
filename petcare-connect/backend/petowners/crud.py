from fastapi import HTTPException
from typing import Optional, List
from sqlalchemy import and_
from users.schemas import UserType, UserUpdate
from users.crud import get_user_by_id
from .schemas import Pet, PetCreate, PetBase, PetUpdate, PetInDB, PetOwnerCreate, PetOwnerUpdate, PetOwnerInDB, PetOwnerPublic


async def create_petowner(user_id: int, petowner: PetOwnerCreate) -> PetOwnerInDB:
    from .models import PetOwner
    
    # Get the user object from the database
    user = await get_user_by_id(user_id)
    usertype = user.user_type
    
    if user:
        if usertype == UserType.petowner:
            # We extend our PetOwnerCreate with the user_id
            new_petowner = petowner.copy(update={"user_id": user_id, "first_name": user.first_name, "last_name": user.last_name})
        
            # Insert the new petowner record into the database
            new_petowner_created = await PetOwner.create(**new_petowner.dict())

            # Return a PetOwnerInDB object representing the newly created record
            return PetOwnerInDB.from_orm(new_petowner_created)
        
        raise HTTPException(status_code=403, detail='Only petowners can create petowner profile')
    
    raise HTTPException(status_code=404, detail="User not found")

    
async def get_petowner_by_id(petowner_id: int) -> Optional[PetOwnerPublic]:
    from .models import PetOwner
    
    petowner = await PetOwner.query.where(PetOwner.user_id == petowner_id).gino.first()
    
    if not petowner:
        raise HTTPException(status_code=404, detail="Petowner profile does not exist")
        
    return petowner



async def update_petowner(user_id: int, user: UserUpdate, petowner: PetOwnerUpdate) -> Optional[PetOwnerPublic]:
    from users.models import User
    from .model import PetOwner
    
    user_data = user.dict(exclude_unset=True)
    petowner_data = petowner.dict(exclude_unset=True)
    
    updated_user = await User.update.values(**user_data).where(User.id == user_id).gino.status()
    updated_petowner = await PetOwner.update.values(**petowner_data).where(PetOwner.user_id == user_id).gino.status()
    
    petowner = await PetOwner.query.where(PetOwner.user_id == user_id).gino.first()
    
    if not updated_petowner:
        raise HTTPException(status_code=404, detail="Petowner details cannot be updated or doesn't exist")
    
    return petowner.__values__



"""    ***CRUD (Create, Read, Update, Delete) Operations for pets below***      """


async def create_pet(owner_id: int, pet: PetCreate) -> PetInDB:
    from .models import Pet
    
    # Get the user object from the database
    user = await get_user_by_id(owner_id)
    pet_user = await get_petowner_by_id(owner_id)
    
    if user:
        if pet_user:
            # We extend our PetCreate with the user_id
            new_pet = pet.copy(update={"owner_id": owner_id})
        
            # Insert the new pet record into the database
            new_pet_created = await Pet.create(**new_pet.dict())

            # Return a PetInDB object representing the newly created record
            return PetInDB.from_orm(new_pet_created)
        
        raise HTTPException(status_code=403, detail='You need to add petowner profile before adding pets')
    
    raise HTTPException(status_code=404, detail="User not found")


async def get_pets(owner_id: int) -> List[PetBase]:
    from .models import Pet
    
    pets = await Pet.query.where(Pet.owner_id == owner_id).gino.all()
    
    if not pets:
        raise HTTPException(status_code=404, detail="No pets found for the user")
        
    # Convert the dicts to PetBase models    
    return [pet.__values__ for pet in pets]


async def get_my_pet_details(name: str, owner_id: int) -> Optional[Pet]:
    from .models import Pet
    
    pet = await Pet.query.where(and_(Pet.name == name, Pet.owner_id == owner_id)).gino.first()
    
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
        
    return pet.__values__


async def get_pet_by_id(pet_id: int) -> Optional[Pet]:
    from .models import Pet
    
    pet = await Pet.query.where(Pet.id == pet_id).gino.first()
    
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
        
    return pet.__values__


async def update_pet(pet_id: int, pet: PetUpdate, owner_id: int) -> Optional[PetBase]:
    from .models import Pet
    
    pet_data = pet.dict(exclude_unset=True)
    
    updated_pet = await Pet.update.values(**pet_data).where(and_(Pet.id == pet_id, Pet.owner_id == owner_id)).gino.status()
    
    pet = await Pet.query.where(Pet.id == pet_id).gino.first()
    
    if not updated_pet:
        raise HTTPException(status_code=404, detail="Pet details cannot be updated or doesn't exist")
    
    return pet.__values__


async def delete_pet(pet_id: int, owner_id: int) -> str:
    from .models import Pet
    
    deleted_pet = await Pet.delete.where(and_(Pet.id == pet_id, Pet.owner_id == owner_id)).gino.status()
    
    if not deleted_pet:
        raise HTTPException(status_code=404, detail="Pet details cannot be deleted or doesn't exist")
        
    return "Pet details successfully deleted"





