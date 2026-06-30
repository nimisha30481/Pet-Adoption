from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required # type: ignore
from extensions import db
from models import Pet

pets_bp = Blueprint("pets_bp", __name__)

# -------------------------
# GET pets (with status filter)
# -------------------------
@pets_bp.route("/pets", methods=["GET"])
def get_pets():
    status = request.args.get("status")

    query = Pet.query
    if status:
        query = query.filter_by(status=status)

    pets = query.all()

    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "species": p.species,
            "breed": p.breed,
            "description": p.description,
            "status": p.status
        }
        for p in pets
    ])


# -------------------------
# GET single pet (FOR EDIT)
# -------------------------
@pets_bp.route("/pets/<int:pet_id>", methods=["GET"])
def get_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)

    return jsonify({
        "id": pet.id,
        "name": pet.name,
        "species": pet.species,
        "breed": pet.breed,
        "description": pet.description,
        "status": pet.status
    })


# -------------------------
# ADD pet
# -------------------------
@pets_bp.route("/pets", methods=["POST"])
def add_pet():
    data = request.get_json()

    pet = Pet(
        name=data.get("name"),
        species=data.get("species"),
        breed=data.get("breed"),
        description=data.get("description"),
        status=data.get("status", "available")
    )

    db.session.add(pet)
    db.session.commit()

    return jsonify({"message": "Pet added successfully"}), 201


# -------------------------
# UPDATE pet
# -------------------------
@pets_bp.route("/pets/<int:pet_id>", methods=["PUT"])
def update_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    data = request.get_json()

    pet.name = data.get("name", pet.name)
    pet.species = data.get("species", pet.species)
    pet.breed = data.get("breed", pet.breed)
    pet.description = data.get("description", pet.description)
    pet.status = data.get("status", pet.status)

    db.session.commit()

    return jsonify({"message": "Pet updated successfully"})


# -------------------------
# DELETE pet
# -------------------------
@pets_bp.route("/pets/<int:pet_id>", methods=["DELETE"])
def delete_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)

    db.session.delete(pet)
    db.session.commit()

    return jsonify({"message": "Pet deleted successfully"})
