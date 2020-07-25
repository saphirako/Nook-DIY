from sqlalchemy.orm import relationship

from api import db


class ItemModel(db.Model):
    __tablename__ = "item"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    buy = db.Column(db.Integer, default=-1)
    sell = db.Column(db.Integer, default=0)
    recipes = relationship("Recipe", backref="item")

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
