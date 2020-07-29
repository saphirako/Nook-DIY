from sqlalchemy.orm import relationship
from sqlalchemy.sql.operators import and_

from nookdiy_api.db import db


class RecipeComponentModel(db.Model):
    __tablename__ = "recipe_material"

    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), primary_key=True)
    material_id = db.Column(db.Integer, db.ForeignKey("material.id"), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    # SQL Alchemy functions
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"{self.quantity} of material #{self.material_id}"

    # Model functions
    @classmethod
    def find_individual_component(cls, recipe_id, material_id):
        return cls.query.filter_by(and_(recipe_id=recipe_id, material_id=material_id)).first()
