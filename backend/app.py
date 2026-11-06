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
MEDIA_DIR = os.path.join(DATA_DIR, "media")
IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg")


def _find_file(folder, stem):
    """Return the first file named `stem.<image extension>` inside folder, or ''."""
    for extension in IMAGE_EXTENSIONS:
        if os.path.isfile(os.path.join(folder, stem + extension)):
            return stem + extension
    return ""


def discover_product_media(product_id):
    """Find local assets in media/products/<id>/ by naming convention.

    - cover.<ext>      -> main cover image
    - vinyl.<ext>      -> custom vinyl disc artwork
    - gallery/*.<ext>  -> extra slider photos, sorted by filename
    Returned paths are relative to media/ so the API can serve them.
    """
    folder = os.path.join(MEDIA_DIR, "products", product_id)
    base = f"products/{product_id}"
    found = {"cover": "", "vinyl": "", "gallery": []}
    if not os.path.isdir(folder):
        return found

    cover = _find_file(folder, "cover")
    vinyl = _find_file(folder, "vinyl")
    if cover:
        found["cover"] = f"{base}/{cover}"
    if vinyl:
        found["vinyl"] = f"{base}/{vinyl}"

    gallery_dir = os.path.join(folder, "gallery")
    if os.path.isdir(gallery_dir):
        found["gallery"] = [
            f"{base}/gallery/{name}"
            for name in sorted(os.listdir(gallery_dir))
            if name.lower().endswith(IMAGE_EXTENSIONS)
        ]
    return found


def apply_local_media(item):
    """Merge discovered local assets into a product dict from products.json."""
    product_id = item.get("id")
    if not product_id:
        return item
    media = discover_product_media(product_id)
    merged = dict(item)

    images = list(merged.get("images") or [])
    if media["cover"]:
        merged["image"] = media["cover"]
        images.insert(0, media["cover"])
    elif merged.get("image") and merged["image"] not in images:
        images.insert(0, merged["image"])
    if media["vinyl"]:
        merged["vinyl_image"] = media["vinyl"]
        if media["vinyl"] not in images:
            images.append(media["vinyl"])
    for path in media["gallery"]:
        if path not in images:
            images.append(path)

    seen = set()
    merged["images"] = [i for i in images if not (i in seen or seen.add(i))]
    return merged


def load_collections(data, product_ids):
    """Build collections from products.json, keeping only products that exist."""
    collections = []
    for entry in data.get("collections", []):
        ids = [pid for pid in entry.get("product_ids", []) if pid in product_ids]
        banner = ""
        folder = os.path.join(MEDIA_DIR, "collections", entry.get("id", ""))
        if os.path.isdir(folder):
            name = _find_file(folder, "banner")
            if name:
                banner = f"collections/{entry['id']}/{name}"
        collections.append(
            {
                **entry,
                "product_ids": ids,
                "count": f"{len(ids):02d} {'disco' if len(ids) == 1 else 'discos'}",
                "image": banner,
            }
        )
    return collections


def load_catalog_from_json():
    """Load and instantiate polymorphic Product objects from products.json storage."""
    if not os.path.exists(DATA_FILE):
        return [], [], []

    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)

        vinyl_records = [
            Product.from_dict(
                apply_local_media({**item, "type": item.get("type", "vinyl")})
            )
            for item in data.get("vinyl_records", [])
        ]
        scene_objects = [
            Product.from_dict(apply_local_media(item))
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


def load_collections_from_json(product_ids):
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return load_collections(json.load(f), set(product_ids))
    except Exception as e:
        print(f"Error loading collections: {e}")
        return []


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
    """Serve local media from backend/data/media (products/<id>/..., collections/<id>/...)."""
    response = send_from_directory(MEDIA_DIR, filename)
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
            "collections": load_collections_from_json(
                p.id for p in current_vinyl + current_scene
            ),
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
