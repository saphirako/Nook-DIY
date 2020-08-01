from sqlalchemy.orm import relationship
from sqlalchemy.sql.operators import and_, or_

from nookdiy_api.api.models import MaterialModel
from nookdiy_api.db import db


class RecipeComponentModel(db.Model):
    __tablename__ = "recipe_material"

    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), primary_key=True)
    material_id = db.Column(db.Integer, db.ForeignKey("material.id"), primary_key=True)
    material = db.relationship("MaterialModel")
    recipe = db.relationship("RecipeModel")
    quantity = db.Column(db.Integer, nullable=False)

    # SQL Alchemy functions
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def json(self):
        return {"material_id": self.material_id, "quantity": self.quantity}

    def __repr__(self):
        return f"{self.quantity} of material #{self.material_id}"

    # Model functions
    @classmethod
    def find_individual_component(cls, recipe_id, material_id):
        return cls.query.filter(cls.recipe_id == recipe_id, cls.material_id == material_id).first()

    @classmethod
    def find_by_components(cls, raw_materials, purely_craftable=True):
        query = cls.query
        conds = []
        mat_ids = []

        # create array of IDs from JSON of names & quantities
        for mat in raw_materials:
            conds.append(and_(cls.material_id == mat["id"], cls.quantity <= mat["quantity"]))
            mat_ids.append(mat["id"])

        # filter based on the requirements per item
        possible = query.filter(or_(*conds)).distinct(RecipeComponentModel.recipe_id)

        # remove recipes with other materials we don't have
        if purely_craftable:
            others = [
                oth.recipe_id
                for oth in cls.query.filter(~RecipeComponentModel.material_id.in_(mat_ids))
                .distinct(RecipeComponentModel.recipe_id)
                .all()
            ]
            results = possible.filter(~cls.recipe_id.in_(others))

        # Or keep the ones that have additional requirements?
        else:
            results = possible

        return [res.recipe for res in results]
