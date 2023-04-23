from app import db
from datetime import datetime


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.BigInteger(), primary_key=True)
    petowner_id = db.Column(db.BigInteger(), db.ForeignKey('petowners.user_id'), nullable=False)
    serviceprovider_id = db.Column(db.BigInteger(), db.ForeignKey('serviceproviders.user_id'), nullable=False)
    booking_id = db.Column(db.BigInteger(), db.ForeignKey('bookings.id'))
    rating = db.Column(db.Numeric(), nullable=False)
    comment = db.Column(db.String(), nullable=True)
    created_at = db.Column(db.DateTime(), nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False, server_default=db.func.now())
    
    
    __table_args__ = (
        db.UniqueConstraint('id')
    )
    
    __mapper_args__ = {
        'polymorphic_identity': 'review'
    }

