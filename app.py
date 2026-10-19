from flask import Flask, render_template

from models.product import DigitalProduct, PhysicalProduct

app = Flask(__name__)

# CUSTOMIZE HERE: choose a theme and introduce your showcase.
SHOWCASE_NAME = "My Showcase"
SHOWCASE_DESCRIPTION = "Small ideas, great discoveries. A collection that feels like me."
AUTHOR_NAME = "Your name"

# CUSTOMIZE HERE: prices are numbers with a decimal point, without R$.
products = [
    PhysicalProduct(
        name="Idea notebook",
        description="A space on paper for sketches, plans, and new discoveries.",
        price=59.90,
        image="placeholder.svg",
        pickup_location="Neighborhood studio",
    ),
    DigitalProduct(
        name="Creativity guide",
        description="A collection of exercises to bring your ideas to life.",
        price=19.90,
        image="placeholder.svg",
        file_format="PDF",
    ),
]


@app.route("/")
def index():
    return render_template(
        "index.html",
        showcase_name=SHOWCASE_NAME,
        showcase_description=SHOWCASE_DESCRIPTION,
        author_name=AUTHOR_NAME,
        products=products,
    )
