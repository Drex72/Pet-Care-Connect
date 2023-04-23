from app import db
from datetime import datetime


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.BigInteger(), primary_key=True)
    petowner_id = db.Column(db.BigInteger(), db.ForeignKey('petowners.user_id'), nullable=False) 
    pet_id = db.Column(db.BigInteger(), db.ForeignKey('pets.id'))
    service_id = db.Column(db.BigInteger(), db.ForeignKey('services.id'))
    serviceprovider_id = db.Column(db.BigInteger(), db.ForeignKey('serviceproviders.user_id')) 
    duration = db.Column(db.Numeric(), server_default="1.0")
    created_at = db.Column(db.DateTime(), nullable=False, server_default=db.func.now())
    completed_at = db.Column(db.DateTime(), nullable=True)
    status = db.Column(db.String(), nullable=False)
    paid_amount = db.Column(db.Numeric(), nullable=False)
    transaction_id = db.Column(db.String(), nullable=True)
    payment_status = db.Column(db.String(), nullable=False)
    stripe_token = db.Column(db.String(length=100), nullable=True)
    
    
    __table_args__ = (
        db.UniqueConstraint('id')
    )
    
    __mapper_args__ = {
        'polymorphic_identity': 'booking'
    }

    
    
 



    
###    Future works - Having multiple services in a booking    ####
    
    
# class BookingItem(db.Model):
#     __tablename__ = "bookingitems"
# 
#     id = db.Column(db.BigInteger(), primary_key=True)
#     booking_id = db.Column(db.BigInteger(), db.ForeignKey('bookings.id'))
#     pet_id = db.Column(db.BigInteger(), db.ForeignKey('pets.id'))
#     service_id = db.Column(db.BigInteger(), db.ForeignKey('services.id'))
#     price = db.Column(db.Numeric(), nullable=False)
#     duration = db.Column(db.Integer(), server_default=1)














