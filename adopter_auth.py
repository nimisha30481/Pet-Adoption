from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token # type: ignore
from datetime import timedelta

from extensions import db
from models import Adopter

adopter_auth_bp = Blueprint("adopter_auth", __name__)

# ---------------- REGISTER ----------------
@adopter_auth_bp.route("/adopter/signup", methods=["POST"])
def register_adopter():
    data = request.get_json()

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    address = data.get("address")

    if not full_name or not email or not password:
        return jsonify({"error": "Required fields missing"}), 400

    if Adopter.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    adopter = Adopter(
        full_name=full_name,
        email=email,
        phone=phone,
        address=address,
        password_hash=generate_password_hash(password)
    )

    db.session.add(adopter)
    db.session.commit()

    return jsonify({"message": "Registration successful"}), 201


# ---------------- LOGIN ----------------
@adopter_auth_bp.route("/adopter/login", methods=["POST"])
def login_adopter():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    adopter = Adopter.query.filter_by(email=email).first()

    if not adopter or not check_password_hash(adopter.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(
        identity=f"adopter:{adopter.id}",
        expires_delta=timedelta(hours=6)
    )

    return jsonify({
        "access_token": token,
        "user": {
            "id": adopter.id,
            "full_name": adopter.full_name,
            "email": adopter.email
        }
    })
