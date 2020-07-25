from api import db


class MaterialModel(db.Model):
    __tablename__ = "material"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)

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

