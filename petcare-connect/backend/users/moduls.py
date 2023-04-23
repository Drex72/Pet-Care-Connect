from app import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(), nullable=False, unique=True)
    username = db.Column(db.String(), nullable=False)
    email_verified = db.Column(db.Boolean(), nullable=True, server_default="True")
    salt = db.Column(db.Unicode(), nullable=False)
    password = db.Column(db.Unicode(), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, server_default="True")
    is_superuser = db.Column(db.Boolean(), nullable=False, server_default="False")
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

#    async def authenticate(self, password: str) -> bool:
#        """
#        Authenticate a user by checking their password against the stored
#        password hash.
#        """
#        return await verify_password(password, self.password_hash, self.salt)


class PetOwner(db.Model):
    __tablename__ = 'petowners'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    phonenumber = Column(String(20), nullable=False)
    address_street = db.Column(db.String(), nullable=False)
    address_city = db.Column(db.String(), nullable=False)
    address_state = db.Column(db.String(), nullable=False)
    address_postalcode = db.Column(db.String(), nullable=False)
                           
    user = db.relationship("User", backref="petowner", lazy='dynamic')
    pets = db.relationship("Pet", backref="owner", lazy='dynamic')


class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer(), primary_key=True)
    owner_id = db.Column(db.Integer(), db.ForeignKey("petowners.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(), nullable=False)
    breed = db.Column(db.String(), nullable=False)
    birthdate = db.Column(db.Date(), nullable=False)
    gender = db.Column(db.String(), nullable=False)


class ServiceProvider(db.Model):
    __tablename__ = 'serviceproviders'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    street_address = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(), nullable=False)
    state = db.Column(db.String(), nullable=False)
    postal_code = db.Column(db.String(), nullable=False)
                           
    user = db.relationship("User", backref="petowner", lazy='dynamic')                     
    services = db.relationship("Service", backref="provider", lazy='dynamic')
                           
                           
class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer(), primary_key=True)
    provider_id = db.Column(db.Integer(), db.ForeignKey("serviceproviders.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    price = db.Column(db.Float(), nullable=False)

