# list_routes.py
from app import create_app

app = create_app()
with app.app_context():
    rules = sorted(app.url_map.iter_rules(), key=lambda r: (r.endpoint, str(r)))
    for r in rules:
        print(f"{r.methods}  {r.rule}  -> {r.endpoint}")
