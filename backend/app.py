import json
import os
from flask import Flask, jsonify, send_from_directory
from models.product import Product

app = Flask(__name__)

SHOWCASE_NAME = "ZUNO"
SHOWCASE_DESCRIPTION = "Uma loja independente para quem nunca termina de descobrir música."
AUTHOR_NAME = "Curadoria ZUNO"

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
DATA_FILE = os.path.join(DATA_DIR, "products.json")


def load_catalog_from_json():
    """Load and instantiate polymorphic Product objects from products.json storage."""
    if not os.path.exists(DATA_FILE):
        return [], [], []

    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)

        vinyl_records = [
            Product.from_dict({**item, "type": item.get("type", "vinyl")})
            for item in data.get("vinyl_records", [])
        ]
        scene_objects = [
            Product.from_dict(item)
            for item in data.get("scene_objects", [])
        ]
        subscriptions = [
            Product.from_dict({**item, "type": "subscription"})
            for item in data.get("subscriptions", [])
        ]
        return vinyl_records, scene_objects, subscriptions
    except Exception as e:
        print(f"Error loading products.json: {e}")
        return [], [], []


# Initial module-level instances for direct access and testing
vinyl_records, scene_objects, subscriptions = load_catalog_from_json()
products = vinyl_records + scene_objects + subscriptions


@app.route("/")
def index():
    return jsonify({
        "name": SHOWCASE_NAME,
        "description": SHOWCASE_DESCRIPTION,
        "endpoints": ["/api/products", "/api/showcase"],
        "storage": "backend/data/products.json"
    })


@app.route("/api/products")
def get_products():
    current_vinyl, current_scene, current_subs = load_catalog_from_json()
    all_current = current_vinyl + current_scene + current_subs
    return jsonify([p.to_dict() for p in all_current])


@app.route("/api/media/<path:filename>")
def get_media(filename):
    """Serve uploaded/custom media files (discs, covers, assets) from backend/data."""
    response = send_from_directory(DATA_DIR, filename)
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response


@app.route("/api/showcase")
def get_showcase():
    current_vinyl, current_scene, current_subs = load_catalog_from_json()
    all_current = current_vinyl + current_scene + current_subs
    return jsonify(
        {
            "showcase_name": SHOWCASE_NAME,
            "showcase_description": SHOWCASE_DESCRIPTION,
            "author_name": AUTHOR_NAME,
            "vinyl_records": [record.to_dict() for record in current_vinyl],
            "scene_objects": [obj.to_dict() for obj in current_scene],
            "subscriptions": [sub.to_dict() for sub in current_subs],
            "all_products": [product.to_dict() for product in all_current],
        }
    )


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


if __name__ == "__main__":
    app.run(debug=True)
