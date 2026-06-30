# backend/models.py
from datetime import datetime
from extensions import db

class Staff(db.Model):
    __tablename__ = 'staff'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('admin', 'caregiver'), nullable=False, default='caregiver')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Pet(db.Model):
    __tablename__ = 'pet'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    species = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(100))
    sex = db.Column(db.Enum('male','female','unknown'), default='unknown')
    birth_date = db.Column(db.Date)
    approx_age_months = db.Column(db.Integer)
    intake_date = db.Column(db.Date)
    status = db.Column(db.Enum('available','pending_adoption','adopted','fostered','not_available'),
                       default='available')
    description = db.Column(db.Text)
    neutered = db.Column(db.Boolean, default=False)
    microchip_id = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class PetPhoto(db.Model):
    __tablename__ = 'pet_photo'
    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id', ondelete='CASCADE'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(255))
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

class AdoptionApplication(db.Model):
    __tablename__ = 'adoption_application'
    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id', ondelete='CASCADE'), nullable=False)
    adopter_id = db.Column(db.Integer, db.ForeignKey('adopter.id', ondelete='CASCADE'), nullable=False)
    status = db.Column(db.Enum('submitted','under_review','approved','rejected','withdrawn'),
                       default='submitted')
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    reviewed_by = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=True)
    reviewed_at = db.Column(db.DateTime, nullable=True)
    review_notes = db.Column(db.Text)

class CareEvent(db.Model):
    __tablename__ = 'care_event'
    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id', ondelete='CASCADE'), nullable=False)
    staff_id = db.Column(db.Integer, db.ForeignKey('staff.id', ondelete='SET NULL'), nullable=True)
    event_type = db.Column(db.Enum('vaccination','medical','deworming','feeding','checkup','other'),
                           nullable=False)
    event_date = db.Column(db.Date, nullable=False)
    details = db.Column(db.Text)
    next_due_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Adopter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(30))
    address = db.Column(db.Text)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime)

