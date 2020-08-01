from sqlalchemy.orm import relationship

from nookdiy_api.api.models import RecipeComponentModel
from nookdiy_api.db import db


class RecipeModel(db.Model):
    __tablename__ = "recipe"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    materials = db.relationship("MaterialModel", secondary="recipe_material")
    item_id = db.Column(db.Integer, db.ForeignKey("item.id"), nullable=True)
    item = db.relationship("ItemModel", foreign_keys=[item_id], backref="recipe", lazy=True)

    # SQL Alchemy functions
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def json(self, verbose=False):
        if verbose:
            recipe_components = [
                RecipeComponentModel.find_individual_component(self.id, mat.id)
                for mat in self.materials
            ]
            return {
                "name": self.name,
                "id": self.id,
                "item_id": self.item_id,
                "materials": [comp.json() for comp in recipe_components],
            }
        else:
            return {"name": self.name, "id": self.id, "item_id": self.item_id}

    def __repr__(self):
        return self.name

    # Model functions
    @classmethod
    def find_by_name(cls, recipe_name):
        return cls.query.filter_by(name=recipe_name).first()

    @classmethod
    def find_by_id(cls, recipe_id):
        return cls.query.filter_by(id=recipe_id).first()

    @classmethod
    def get_all_recipes(cls):
        all_recipes = [recipe.json() for recipe in cls.query.all()]
        return all_recipes
