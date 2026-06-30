from werkzeug.security import generate_password_hash
from models import Staff
from extensions import db
from app import create_app

app = create_app()

with app.app_context():
    password = "peta@123"

    staff = Staff(
        name="Admin",
        email="admin@example.com",
        password_hash=generate_password_hash(password),
        role="admin"
    )

    db.session.add(staff)
    db.session.commit()

    print("✅ Admin staff seeded successfully")
