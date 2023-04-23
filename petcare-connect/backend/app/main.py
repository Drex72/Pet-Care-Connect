from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from gino.ext.starlette import Gino
from users.api.controller import router as user_router
from petowners.api.controller import router as petowners_router
from serviceproviders.api.controller import router as serviceproviders_router
from bookings.api.controller import router as bookings_router
from reviews.api.controller import router as reviews_router
from sqlalchemy import MetaData

__all__ = ['app', 'db']

def get_application():
    _app = FastAPI(title=settings.PROJECT_NAME)

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @_app.on_event("startup")
    async def startup():
        print("app started")
    
    
    @_app.on_event("shutdown")
    async def shutdown():
        print("SHUTDOWN")

    # this is the new added
    _app.include_router(user_router, prefix='/users')
    _app.include_router(petowners_router, prefix='/petowners')
    _app.include_router(serviceproviders_router, prefix='/serviceproviders')
    _app.include_router(bookings_router, prefix='/bookings')
    _app.include_router(reviews_router, prefix='/reviews')

    return _app 


app = get_application()

db: MetaData = Gino(
        app,
        dsn=settings.DATABASE_URI,
        pool_min_size=3,
        pool_max_size=20,
        retry_limit=10,
        retry_interval=10,
        ssl=None,
    )
