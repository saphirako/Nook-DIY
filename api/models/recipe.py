from sqlalchemy.orm import relationship

from api import db

# Create secondary table that handles Recipe-Material
material_counts = db.Table(
    "recipe-material",
    db.Column("recipe_id", db.Integer, db.ForeignKey("recipe.id")),
    db.Column("material_id", db.Integer, db.ForeignKey("material.id")),
    db.Column("quantity", db.Integer),
)


class RecipeModel(db.Model):
    __tablename__ = "recipe"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("item.id"))
    item = relationship("Recipe", back_populates="recipes")
    materials = relationship("Material", secondary=material_counts)

    # SQL Alchemy functions
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"{self.name} ({self.id})"

    # Model functions
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter(id=id).first()

