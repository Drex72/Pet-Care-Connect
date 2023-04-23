import string
from pydantic import EmailStr, constr, validator
from app.schemas import CoreModel, DateTimeModelMixin, IDModelMixin
from typing import Optional, List
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


class UserBase(CoreModel):
    """
    Leaving off password and salt from base model
    """
    email: EmailStr
    username: Optional[str]
    email_verified: bool = False
    is_active: bool = True
    is_superuser: bool = False


class UserCreate(UserBase):
    
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


class User(UserBase):
    id: int
    user_type: str

    class Config:
        orm_mode = True


class Pet(CoreModel):
    name: str
    breed: str
    birthdate: str
    gender: str


class PetOwnerCreate(UserCreate):
    firstname: str
    lastname: str
    phonenumber: str
    address: str


class PetOwner(User):
    firstname: str
    lastname: str
    phonenumber: str
    address: str
    pets: List[Pet] = []

    class Config:
        orm_mode = True


class Service(CoreModel):
    name: str
    description: str
    price: float


class ServiceProviderCreate(UserCreate):
    firstname: str
    lastname: str
    phonenumber: str
    address: str


class ServiceProvider(User):
    firstname: str
    lastname: str
    phonenumber: str
    address: str
    services: List[Service] = []

    class Config:
        orm_mode = True


class UserLogin(CoreModel):
    """
    only email and password are required for logging in the user
    """
    username: Optional[str] = None
    email: EmailStr
    password: constr(min_length=7, max_length=100)
        
    @root_validator
    def set_username_from_email(cls, values):
        values["username"] = generate_username(values["email"])
        return values
    
    @validator("username", pre=True)
    def username_is_valid(cls, username: Optional[str], values: dict) -> str:
        if not username:
            username = values.get("email").split("@")[0]
        return validate_username(username)

    
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

