from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token # type: ignore

from models import Staff

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Missing JSON body"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    staff = Staff.query.filter_by(email=email).first()

    if not staff or not check_password_hash(staff.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(staff.id))

    return jsonify({
        "access_token": access_token,
        "staff": {
            "id": staff.id,
            "name": staff.name,
            "email": staff.email,
            "role": staff.role
        }
    })
