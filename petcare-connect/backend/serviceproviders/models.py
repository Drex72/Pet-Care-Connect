from app import db
from datetime import datetime

class ServiceProvider(db.Model):
    __tablename__ = 'serviceproviders'

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
    
    
    # user = db.relationship("User", backref="provider", lazy='dynamic')
    
    __table_args__ = (
        db.UniqueConstraint('user_id')
    )
    
    __mapper_args__ = {
        'polymorphic_identity': 'serviceprovider'
    }
                           
                           
class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.BigInteger(), primary_key=True)
    provider_id = db.Column(db.BigInteger(), db.ForeignKey("serviceproviders.user_id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(), nullable=False)
    description = db.Column(db.Unicode(), nullable=False)
    price = db.Column(db.Numeric(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False, server_default=db.func.now())
