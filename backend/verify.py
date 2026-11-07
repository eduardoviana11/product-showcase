"""Run with the .venv Python executable; no external test framework is needed."""

import os
import sys
import unittest

# Ensure backend directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app, products, vinyl_records, scene_objects
from models.product import DigitalProduct, PhysicalProduct, Product, VinylProduct, SubscriptionProduct


class ShowcaseChecks(unittest.TestCase):
    def test_abstraction(self):
        """Product is an abstract base class and cannot be instantiated."""
        with self.assertRaises(TypeError):
            Product(name="Test", description="Test", price=100, image="placeholder.svg")

    def test_models_and_encapsulation(self):
        """Encapsulation: price cannot be negative, formatted_price uses BRL."""
        for product_class, extra in (
            (PhysicalProduct, {"pickup_location": "Estúdio ZUNO"}),
            (DigitalProduct, {"file_format": "PDF"}),
            (VinylProduct, {"artist": "Artista Teste", "category": "Canção"}),
            (SubscriptionProduct, {"frequency": "quinzenal"}),
        ):
            with self.subTest(product_class=product_class.__name__):
                arguments = dict(name="Test", description="Test", price=59.90, image="placeholder.svg", **extra)
                with self.assertRaisesRegex(ValueError, "The price cannot be negative."):
                    product_class(**{**arguments, "price": -1})

                product = product_class(**arguments)
                self.assertIsInstance(product, Product)
                self.assertEqual(product.formatted_price(), "R$ 59,90")

                with self.assertRaisesRegex(ValueError, "The price cannot be negative."):
                    product.price = -10
                self.assertEqual(product.price, 59.90)

                product.price = 0
                self.assertEqual(product.formatted_price(), "R$ 0,00")
                product.price = 189.90
                self.assertEqual(product.formatted_price(), "R$ 189,90")

    def test_polymorphism(self):
        """Polymorphism: each subclass implements its own delivery specification."""
        physical = PhysicalProduct(
            name="Bolsa", description="Test", price=69.90, image="placeholder.svg", pickup_location="Loja ZUNO"
        )
        vinyl = VinylProduct(
            name="Disco", artist="Artista", description="Test", price=189.90, image="placeholder.svg",
            category="Jazz", weight_grams=180, tracks_count=10, pickup_location="Estúdio ZUNO"
        )
        subscription = SubscriptionProduct(
            name="Newsletter", description="Test", price=29.90, image="placeholder.svg", frequency="quinzenal"
        )
        self.assertIsInstance(subscription, DigitalProduct)

        deliveries = [physical.delivery(), vinyl.delivery(), subscription.delivery()]
        self.assertEqual(len(set(deliveries)), 3, "All delivery outputs must be distinct")
        self.assertIn("Loja ZUNO", physical.delivery())
        self.assertIn("180g", vinyl.delivery())
        self.assertIn("quinzenal", subscription.delivery())

    def test_to_dict_serialization(self):
        """Polymorphic serialization includes delivery and formatted price."""
        for p in products:
            data = p.to_dict()
            self.assertIsInstance(data, dict)
            self.assertIn("id", data)
            self.assertTrue(len(data["id"]) > 0)
            self.assertIn("name", data)
            self.assertIn("price", data)
            self.assertIn("formatted_price", data)
            self.assertIn("delivery", data)
            self.assertEqual(data["delivery"], p.delivery())
            self.assertEqual(data["formatted_price"], p.formatted_price())

    def test_api_products(self):
        """GET /api/products returns JSON list of all serialized products."""
        with app.test_client() as client:
            response = client.get("/api/products")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.mimetype, "application/json")
            data = response.get_json()
            self.assertIsInstance(data, list)
            self.assertEqual(len(data), len(products))

    def test_api_showcase(self):
        """GET /api/showcase returns complete showcase payload."""
        with app.test_client() as client:
            response = client.get("/api/showcase")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.mimetype, "application/json")
            data = response.get_json()
            self.assertEqual(data["showcase_name"], "ZUNO")
            self.assertEqual(len(data["vinyl_records"]), len(vinyl_records))
            self.assertEqual(len(data["scene_objects"]), len(scene_objects))

    def test_api_media(self):
        """GET /api/media/<path> serves assets from backend/data/media."""
        with app.test_client() as client:
            response = client.get(
                "/api/media/products/bewitched-the-goddess-edition/vinyl.png"
            )
            self.assertEqual(response.status_code, 200)
            self.assertTrue(len(response.data) > 0)

    def test_local_media_discovery(self):
        """Files in media/products/<id>/ are attached to the product automatically."""
        laufey = next(r for r in vinyl_records if r.id == "bewitched-the-goddess-edition")
        self.assertEqual(
            laufey.vinyl_image, "products/bewitched-the-goddess-edition/vinyl.png"
        )
        self.assertIn(laufey.vinyl_image, laufey.images)

    def test_api_collections(self):
        """/api/showcase exposes collections whose products exist in the catalog."""
        with app.test_client() as client:
            data = client.get("/api/showcase").get_json()
        ids = {p["id"] for p in data["vinyl_records"]}
        self.assertGreaterEqual(len(data["collections"]), 1)
        for collection in data["collections"]:
            self.assertTrue(collection["product_ids"])
            self.assertTrue(set(collection["product_ids"]) <= ids)

    def test_json_storage_and_factory(self):
        """Test Product.from_dict factory method and JSON storage loading."""
        sample_vinyl = {
            "type": "vinyl",
            "name": "TEST VINYL",
            "artist": "Test Artist",
            "description": "Test description",
            "price": 150.0,
            "category": "Jazz",
            "weight_grams": 180,
            "tracks_count": 8,
        }
        vinyl = Product.from_dict(sample_vinyl)
        self.assertIsInstance(vinyl, VinylProduct)
        self.assertEqual(vinyl.name, "TEST VINYL")
        self.assertEqual(vinyl.formatted_price(), "R$ 150,00")
        self.assertIn("180g", vinyl.delivery())
        self.assertEqual(vinyl.to_dict()["type"], "vinyl")
        # Store flags default to False / empty
        self.assertFalse(vinyl.featured)
        self.assertFalse(vinyl.is_new)
        self.assertFalse(vinyl.hot_100)
        self.assertEqual(vinyl.to_dict()["vinyl_image"], "")

        flagged = Product.from_dict({
            **sample_vinyl,
            "featured": True,
            "is_new": True,
            "hot_100": True,
            "vinyl_image": "https://example.com/disc.png",
        })
        data = flagged.to_dict()
        self.assertTrue(data["featured"])
        self.assertTrue(data["is_new"])
        self.assertTrue(data["hot_100"])
        self.assertEqual(data["vinyl_image"], "https://example.com/disc.png")


if __name__ == "__main__":
    unittest.main(verbosity=2)
