from sqlalchemy.orm import relationship

from nookdiy_api.db import db


class ItemModel(db.Model):
    __tablename__ = "item"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    buy = db.Column(db.Integer, default=-1)
    sell = db.Column(db.Integer, default=0)

    # SQL Alchemy functions
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def json(self, verbose=False):
        return (
            {"id": self.id, "name": self.name, "buy": self.buy, "sell": self.sell}
            if verbose
            else {"id": self.id, "name": self.name}
        )

    def __repr__(self):
        return f"{self.name} ({self.id})"

    # Model functions
    @classmethod
    def find_by_name(cls, item_name):
        return cls.query.filter_by(name=item_name).first()

    @classmethod
    def find_by_id(cls, item_id):
        return cls.query.filter_by(id=item_id).first()

    @classmethod
    def get_all_items(cls):
        all_items = [item.json() for item in cls.query.all()]
        return all_items
