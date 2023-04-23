from fastapi import HTTPException
from .schemas import UserPasswordUpdate, UserCreate, UserInDB, UserWithID

from pydantic import EmailStr
# from backend.app.core.config import settings


async def create_user(new_user: UserCreate) -> UserInDB:
    from users.models import User
    from users import auth_service
    
    # This is a UserPasswordUpdate
    new_password = auth_service.create_salt_and_hashed_password(plaintext_password=new_user.password)
    
    # Next we extend our UserCreate schema here
    new_user_params = new_user.copy(update=new_password.dict())
    
    # Updated and extended UserCreate schema was passed to UserInDB
    new_user_updated = UserInDB(**new_user_params.dict())
    
    # # Database model User creation happens here
    created_user = await User.create(**new_user_updated.dict())

    # And now we nicely return from_orm with UserInDB
    return UserInDB.from_orm(created_user)


async def get_user_by_username(user_name: str) -> UserWithID:
    from users.models import User
    
    # async with db.with_bind(settings.DATABASE_URI) as engine:
    found_user = await User.query.where(User.username == user_name).gino.first()
    if found_user:
        return UserWithID.from_orm(found_user)
    raise HTTPException(status_code=404, detail="User with given username not found")
    

async def get_user_by_email(email: EmailStr) -> UserWithID:
    from users.models import User
    
    # async with db.with_bind(settings.DATABASE_URI) as engine:
    found_user = await User.query.where(User.email == email).gino.first()
    if found_user:
        return UserWithID.from_orm(found_user)
    raise HTTPException(status_code=404, detail="User with given email not found")
    
    
async def get_user_by_id(user_id: int) -> UserWithID:
    from users.models import User
    
    # async with db.with_bind(settings.DATABASE_URI) as engine:
    found_user = await User.query.where(User.id == user_id).gino.first()
    if found_user:
        return UserWithID.from_orm(found_user)
    raise HTTPException(status_code=404, detail="User with given id not found")


async def delete_user(user_id: int) -> str:
    from .models import User
    
    deleted_user = await User.delete.where(User.id == user_id).gino.status()
    
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User details cannot be deleted or doesn't exist")
        
    return "User details successfully deleted"

    
    
    