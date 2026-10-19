from flask import Flask, jsonify
from models.product import DigitalProduct, PhysicalProduct, VinylProduct

app = Flask(__name__)

SHOWCASE_NAME = "ZUNO"
SHOWCASE_DESCRIPTION = "Uma loja independente para quem nunca termina de descobrir música."
AUTHOR_NAME = "Curadoria ZUNO"

vinyl_records = [
    VinylProduct(
        name="DEPOIS DA CHUVA",
        artist="Clara Breu",
        description="Canções acústicas gravadas em fita de rolo durante o inverno.",
        price=189.90,
        image="placeholder.svg",
        category="Canção",
        weight_grams=180,
        tracks_count=10,
        cover_variant="coastal-bands",
    ),
    VinylProduct(
        name="FREQUÊNCIA DE RUA",
        artist="Os Satélites",
        description="Synthesizers analógicos, percussão urbana e ecos de dub.",
        price=189.90,
        image="placeholder.svg",
        category="Psicodelia",
        weight_grams=180,
        tracks_count=10,
        cover_variant="orange-stripes",
    ),
    VinylProduct(
        name="JARDIM ELÉTRICO",
        artist="Flora Noturna",
        description="Texturas modulares e batidas lentas para escuta noturna.",
        price=189.90,
        image="placeholder.svg",
        category="Eletrônica",
        weight_grams=180,
        tracks_count=10,
        cover_variant="purple-circle",
    ),
    VinylProduct(
        name="ENTRE PRÉDIOS",
        artist="Caio Horizonte",
        description="Improvisos de sopro e contrabaixo gravados ao vivo em tomada única.",
        price=189.90,
        image="placeholder.svg",
        category="Jazz",
        weight_grams=180,
        tracks_count=10,
        cover_variant="diagonal-split",
    ),
    VinylProduct(
        name="SOLAR DE OUTONO",
        artist="Três Mares",
        description="Violões de 12 cordas e harmonias vocais do recôncavo.",
        price=179.90,
        image="placeholder.svg",
        category="Canção",
        weight_grams=180,
        tracks_count=9,
        cover_variant="coastal-bands",
    ),
    VinylProduct(
        name="CÂMARA DE ECO",
        artist="Vetor Sul",
        description="Experimentos eletroacústicos e loops de fita magnética.",
        price=199.90,
        image="placeholder.svg",
        category="Eletrônica",
        weight_grams=180,
        tracks_count=8,
        cover_variant="purple-circle",
    ),
]

scene_objects = [
    PhysicalProduct(
        name="BOLSA ESCUTA LIVRE",
        description="Para carregar até 15 LPs com reforço duplo na alça.",
        price=69.90,
        image="placeholder.svg",
        pickup_location="Loja ZUNO",
        category="Objetos",
        specs_meta="ALGODÃO CRU · SERIGRAFIA · 38 × 42 CM",
        action_label="Ver objeto",
        cover_variant="tote-bag",
    ),
    PhysicalProduct(
        name="CARTAZ FREQUÊNCIA COMUM",
        description="Tiragem numerada impressa manualmente em papel encorpado.",
        price=89.90,
        image="placeholder.svg",
        pickup_location="Loja ZUNO",
        category="Objetos",
        specs_meta="SERIGRAFIA EM 2 CORES · 30 × 42 CM",
        action_label="Ver objeto",
        cover_variant="screenprint-poster",
    ),
    DigitalProduct(
        name="CADERNO DE ESCUTA - VOL. 01",
        description="Ensaios curtos, fichas de prensagem e notas de estúdio.",
        price=39.90,
        image="placeholder.svg",
        file_format="Impresso + PDF",
        category="Objetos",
        specs_meta="PUBLICAÇÃO INDEPENDENTE · 64 PÁGINAS",
        action_label="Ver objeto",
        cover_variant="listening-notebook",
    ),
]

products = vinyl_records + scene_objects


@app.route("/")
def index():
    return jsonify({
        "name": SHOWCASE_NAME,
        "description": SHOWCASE_DESCRIPTION,
        "endpoints": ["/api/products", "/api/showcase"]
    })


@app.route("/api/products")
def get_products():
    return jsonify([product.to_dict() for product in products])


@app.route("/api/showcase")
def get_showcase():
    return jsonify(
        {
            "showcase_name": SHOWCASE_NAME,
            "showcase_description": SHOWCASE_DESCRIPTION,
            "author_name": AUTHOR_NAME,
            "vinyl_records": [record.to_dict() for record in vinyl_records],
            "scene_objects": [obj.to_dict() for obj in scene_objects],
            "all_products": [product.to_dict() for product in products],
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
