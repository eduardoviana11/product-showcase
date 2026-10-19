"""Run with the .venv Python executable; no external test framework is needed."""

import unittest

from app import app, products, vinyl_records, scene_objects
from models.product import DigitalProduct, PhysicalProduct, Product, VinylProduct


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
        digital = DigitalProduct(
            name="Caderno", description="Test", price=39.90, image="placeholder.svg", file_format="PDF"
        )
        vinyl = VinylProduct(
            name="Disco", artist="Artista", description="Test", price=189.90, image="placeholder.svg",
            category="Jazz", weight_grams=180, tracks_count=10, pickup_location="Estúdio ZUNO"
        )

        deliveries = [physical.delivery(), digital.delivery(), vinyl.delivery()]
        self.assertEqual(len(set(deliveries)), 3, "All delivery outputs must be distinct")
        self.assertIn("Loja ZUNO", physical.delivery())
        self.assertIn("PDF", digital.delivery())
        self.assertIn("180g", vinyl.delivery())

    def test_to_dict_serialization(self):
        """Polymorphic serialization includes delivery and formatted price."""
        for p in products:
            data = p.to_dict()
            self.assertIsInstance(data, dict)
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
            self.assertEqual(len(data["all_products"]), len(products))


if __name__ == "__main__":
    unittest.main(verbosity=2)
