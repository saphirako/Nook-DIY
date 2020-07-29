from sqlalchemy.orm import relationship

from nookdiy_api.db import db


class MaterialModel(db.Model):
    __tablename__ = "material"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    recipes = db.relationship("RecipeModel", secondary="recipe_material")

    # SQL Alchemy functions
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"{self.name} ({self.id})"

    # Model functions
    @classmethod
    def find_by_name(cls, material_name):
        return cls.query.filter_by(name=material_name).first()

    @classmethod
    def find_by_id(cls, material_id):
        return cls.query.filter_by(id=material_id).first()
