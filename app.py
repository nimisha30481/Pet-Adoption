import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS # type: ignore
from extensions import db, migrate, jwt
from flask_jwt_extended import JWTManager # type: ignore
from routes import adopter_auth_bp, pets_bp, auth_bp

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret')
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False

    # initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    jwt.init_app(app)

    # enable CORS
    CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Authorization"],
)

    # register pets API
    app.register_blueprint(pets_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(adopter_auth_bp, url_prefix="/api")

    @app.route('/')
    def home():
        return jsonify({"message": "Pet Adoption API running successfully!"})

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

