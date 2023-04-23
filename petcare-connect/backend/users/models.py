from app import db
# from sqlalchemy import text


class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.BigInteger(), primary_key=True)
    user_type = db.Column(db.String(), nullable=False)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    username = db.Column(db.Unicode(), unique=True, nullable=False)
    salt = db.Column(db.Unicode(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    email_verified = db.Column(db.Boolean(), nullable=True, server_default="True")
    is_active = db.Column(db.Boolean(), nullable=False, server_default="True")
    is_superuser = db.Column(db.Boolean(), nullable=False, server_default="False")
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)
    
    __table_args__ = (
        db.UniqueConstraint('email', name='unique_email')
    )

    __mapper_args__ = {
        'polymorphic_on': user_type,
        'polymorphic_identity': 'user'
    }