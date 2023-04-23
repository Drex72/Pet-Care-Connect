from fastapi import APIRouter, Depends, HTTPException, status
from users import auth_service
from ..schemas import UserCreate, UserInDB, UserPublic, UserLogin, AccessToken, UserWithID
from users import auth_service
from app.core.config import settings

router = APIRouter()


def logged_in(current_user = Depends(auth_service.get_current_user)):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You must be logged in to perform this action",
        )
    return current_user


@router.post(
    "/create",
    tags=["create a user"],
    description="Register the User",
    response_model=UserPublic,
)
async def user_create(user: UserCreate) -> UserInDB:
    from ..crud import create_user

    return await create_user(user)


@router.post(
    '/login',
    tags=["user login"],
    description="Log in the User",
    response_model=UserPublic
)
async def user_login(user: UserLogin) -> UserPublic:
    from ..crud import get_user_by_username

    found_user = await get_user_by_username(user_name=user.username)
    if auth_service.verify_password(password=user.password, salt=found_user.salt, hashed_pw=found_user.password):
        # If the provided password is valid one then we are going to create an access token
        token = auth_service.create_access_token_for_user(user=found_user)
        access_token = AccessToken(access_token=token, token_type='bearer')
        return UserPublic(**found_user.dict(), access_token=access_token)
    raise HTTPException(status_code=401, detail='Incorrect password provided')

    
@router.delete("/delete", 
            tags=["delete a user"], 
            description="Delete user",
            response_model=str
           )
async def delete_a_user(current_user: UserWithID = Depends(logged_in)):
    from ..crud import delete_user
    
    return await delete_user(current_user.id)   
    

# from fastapi import APIRouter

# router = APIRouter()


# @router.get("/")
# def get_users():
#     return "users app created!"
