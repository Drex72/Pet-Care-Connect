from app import db
# from sqlalchemy import text
    

class PetOwner(db.Model):
    __tablename__ = 'petowners'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.BigInteger(), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    address_street = db.Column(db.String(), nullable=False)
    address_city = db.Column(db.String(), nullable=False)
    address_state = db.Column(db.String(), nullable=False)
    address_postalcode = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False, server_default=db.func.now())
                           
    
    __table_args__ = (
        db.UniqueConstraint('user_id')
    )
    
    __mapper_args__ = {
        'polymorphic_identity': 'petowner'
    }

    
class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.BigInteger(), primary_key=True)
    owner_id = db.Column(db.BigInteger(), db.ForeignKey("petowners.user_id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(), nullable=False)
    breed = db.Column(db.String(), nullable=False)
    birthdate = db.Column(db.Date(), nullable=False)
    gender = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False, server_default=db.func.now())

