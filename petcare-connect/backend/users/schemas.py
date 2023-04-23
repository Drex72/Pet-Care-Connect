import string
from enum import Enum
from pydantic import EmailStr, constr, validator, root_validator
from app.schemas import CoreModel, DateTimeModelMixin, IDModelMixin
from typing import Optional
from datetime import datetime, timedelta
from app.core.config import settings


# simple check for valid username
def validate_username(username: str) -> str:
    allowed = string.ascii_letters + string.digits + "-" + "_"
    assert all(char in allowed for char in username), "Invalid characters in username."
    assert len(username) >= 3, "Username must be 3 characters or more."
    return username

# generate username
def generate_username(email: EmailStr) -> str:
    username = email.split('@')[0]
    return username


# Add JWT schemas
class JWTMeta(CoreModel):
    iss: str = "localhost"
    aud: str = settings.JWT_AUDIENCE
    iat: float = datetime.timestamp(datetime.now())
    exp: float = datetime.timestamp(datetime.now() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))


class JWTCreds(CoreModel):
    """How we'll identify users"""
    sub: EmailStr
    username: str


class JWTPayload(JWTMeta, JWTCreds):
    """
    JWT Payload right before it's encoded - combine meta and username
    """
    pass


class AccessToken(CoreModel):
    access_token: str
    token_type: str
        

class TokenData(CoreModel):
    username: Optional[str] = None

        
class UserType(str, Enum):
    petowner = "petowner"
    serviceprovider = "serviceprovider"
    admin = "admin"


class UserBase(CoreModel):
    """
    Leaving off password and salt from base model
    """
    user_type: UserType
    first_name: str
    last_name: str
    email: Optional[EmailStr]
    username: Optional[str]
    email_verified: bool = False
    is_active: bool = True
    is_superuser: bool = False


class UserCreate(CoreModel):
    """
    Email, username, and password are required for registering a new user
    """
    user_type: UserType
    first_name: str
    last_name: str
    email: EmailStr
    password: constr(min_length=7, max_length=100)
    username: Optional[str] = None
    
    @root_validator
    def set_username_from_email(cls, values):
        values["username"] = generate_username(values["email"])
        return values
    
    @validator("username", pre=True)
    def username_is_valid(cls, username: Optional[str], values: dict) -> str:
        if not username:
            username = values.get("email").split("@")[0]
        return validate_username(username)

    class Config:
        orm_mode = True


class UserLogin(CoreModel):
    """
    only email and password are required for logging in the user
    """
    # username: Optional[str] = None
    email: EmailStr
    password: constr(min_length=7, max_length=100)
        
    @root_validator
    def set_username_from_email(cls, values):
        values["username"] = generate_username(values["email"])
        return values
    
    # @validator("username", pre=True)
    #def username_is_valid(cls, username: Optional[str], values: dict) -> str:
     #   username = None
      #  if values.get("email") is not None:
       #     username = values.get("email").split("@")[0]

        #return validate_username(username)
    

class UserInDB(DateTimeModelMixin, UserBase):
    """
    Add in id, created_at, updated_at, and user's password and salt
    """
    
    password: constr(min_length=7, max_length=100)
    salt: str

    class Config:
        orm_mode = True
        
        
class UserWithID(UserInDB):
    """
    Add id field
    """
    id: int

    class Config:
        orm_mode = True


class UserPublic(DateTimeModelMixin, UserBase):
    access_token: Optional[AccessToken]

    class Config:
        orm_mode = True


# TODO: UserUpdate for profile update can be here
class UserUpdate(CoreModel):
    """
    Leaving off password and salt from UserUpdate model
    """
    first_name: str
    last_name: str


# TODO: UserPasswordUpdate for password update can be here

class UserPasswordUpdate(CoreModel):
    """
    Users can change their password
    """
    password: constr(min_length=7, max_length=100)
    salt: str

    class Config:
        orm_mode = True


