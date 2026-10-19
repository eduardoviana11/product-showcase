from abc import ABC, abstractmethod


class Product(ABC):
    """Abstraction: share common attributes and require a delivery method."""

    def __init__(
        self,
        name,
        description,
        price,
        image,
        category="Todos",
        specs_meta="",
        artist="",
        action_label="Ver disco",
        cover_variant="coastal-bands",
    ):
        self.name = name
        self.description = description
        self.price = price  # Encapsulation: validated via setter
        self.image = image
        self.category = category
        self.specs_meta = specs_meta
        self.artist = artist
        self.action_label = action_label
        self.cover_variant = cover_variant

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("The price cannot be negative.")
        self._price = value

    def formatted_price(self):
        return f"R$ {self.price:.2f}".replace(".", ",")

    @abstractmethod
    def delivery(self):
        """Each product type must describe its delivery or format specification."""

    def to_dict(self):
        """Polymorphic serialization without isinstance checks."""
        return {
            "name": self.name,
            "artist": self.artist,
            "description": self.description,
            "price": self.price,
            "formatted_price": self.formatted_price(),
            "image": self.image,
            "category": self.category,
            "specs_meta": self.specs_meta,
            "delivery": self.delivery(),
            "action_label": self.action_label,
            "cover_variant": self.cover_variant,
        }


class PhysicalProduct(Product):
    def __init__(
        self,
        name,
        description,
        price,
        image,
        pickup_location,
        category="Objetos",
        specs_meta="",
        artist="",
        action_label="Ver objeto",
        cover_variant="object-minimal",
    ):
        super().__init__(
            name,
            description,
            price,
            image,
            category=category,
            specs_meta=specs_meta,
            artist=artist,
            action_label=action_label,
            cover_variant=cover_variant,
        )
        self.pickup_location = pickup_location

    def delivery(self):
        return f"Envio físico ou retirada: {self.pickup_location}."


class DigitalProduct(Product):
    def __init__(
        self,
        name,
        description,
        price,
        image,
        file_format,
        category="Digital",
        specs_meta="",
        artist="",
        action_label="Ver edição",
        cover_variant="digital-minimal",
    ):
        super().__init__(
            name,
            description,
            price,
            image,
            category=category,
            specs_meta=specs_meta,
            artist=artist,
            action_label=action_label,
            cover_variant=cover_variant,
        )
        self.file_format = file_format

    def delivery(self):
        return f"Entrega digital em formato {self.file_format}."


class VinylProduct(PhysicalProduct):
    def __init__(
        self,
        name,
        artist,
        description,
        price,
        image,
        category,
        weight_grams=180,
        tracks_count=10,
        pickup_location="Estúdio ZUNO",
        cover_variant="coastal-bands",
    ):
        specs_meta = f"VINIL PRETO · {weight_grams} G · {tracks_count} FAIXAS"
        super().__init__(
            name=name,
            description=description,
            price=price,
            image=image,
            pickup_location=pickup_location,
            category=category,
            specs_meta=specs_meta,
            artist=artist,
            action_label="Ver disco",
            cover_variant=cover_variant,
        )
        self.weight_grams = weight_grams
        self.tracks_count = tracks_count

    def delivery(self):
        return f"Prensagem {self.weight_grams}g ({self.tracks_count} faixas) · Retirada ou envio: {self.pickup_location}."
