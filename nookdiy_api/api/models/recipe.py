from sqlalchemy.orm import relationship

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

    def __repr__(self):
        return f"{self.name} ({self.id})"

    # Model functions
    @classmethod
    def find_by_name(cls, recipe_name):
        return cls.query.filter_by(name=recipe_name).first()

    @classmethod
    def find_by_id(cls, recipe_id):
        return cls.query.filter_by(id=recipe_id).first()
