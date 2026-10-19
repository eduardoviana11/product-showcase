"""Run with the .venv Python executable; no external test framework is needed."""

import unittest

from markupsafe import escape

from app import app, products
from models.product import DigitalProduct, PhysicalProduct, Product


class ShowcaseChecks(unittest.TestCase):
    def test_page_and_content(self):
        response = app.test_client().get("/")
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)
        self.assertIn('<html lang="en">', html)
        self.assertEqual(html.count('<article class="card">'), len(products))
        for product in products:
            # Match Jinja's automatic HTML escaping.
            for text in (product.name, product.formatted_price(), product.delivery()):
                self.assertIn(str(escape(text)), html)
            self.assertIn(f'/static/images/{product.image}', html)

    def test_static_files(self):
        with app.test_client() as client:
            for path, mime_type in (
                ("/static/css/style.css", "text/css"),
                ("/static/images/placeholder.svg", "image/svg+xml"),
            ):
                response = client.get(path)
                self.assertEqual(response.status_code, 200)
                self.assertEqual(response.mimetype, mime_type)
                self.assertTrue(response.data)
                if path.endswith(".svg"):
                    self.assertIn("Your photo here", response.get_data(as_text=True))
                response.close()

    def test_abstraction(self):
        with self.assertRaises(TypeError):
            Product(name="Test", description="Test", price=1, image="placeholder.svg")

    def test_models(self):
        for product_class, extra in (
            (PhysicalProduct, {"pickup_location": "Library"}),
            (DigitalProduct, {"file_format": "PDF"}),
        ):
            with self.subTest(product_class=product_class.__name__):
                arguments = dict(name="Test", description="Test", image="placeholder.svg", **extra)
                with self.assertRaisesRegex(ValueError, "The price cannot be negative."):
                    product_class(price=-1, **arguments)
                product = product_class(price=59.90, **arguments)
                self.assertIsInstance(product, Product)
                self.assertEqual(product.formatted_price(), "R$ 59,90")
                with self.assertRaisesRegex(ValueError, "The price cannot be negative."):
                    product.price = -1
                self.assertEqual(product.price, 59.90)
                product.price = 0
                self.assertEqual(product.formatted_price(), "R$ 0,00")
                product.price = 12.50
                self.assertEqual(product.formatted_price(), "R$ 12,50")

    def test_polymorphism(self):
        physical = PhysicalProduct(
            name="Test", description="Test", price=1,
            image="placeholder.svg", pickup_location="Library",
        )
        digital = DigitalProduct(
            name="Test", description="Test", price=1,
            image="placeholder.svg", file_format="PDF",
        )
        self.assertNotEqual(physical.delivery(), digital.delivery())
        self.assertIn("Library", physical.delivery())
        self.assertIn("PDF", digital.delivery())


if __name__ == "__main__":
    unittest.main(verbosity=2)
