from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from nookdiy_api.api import models
from nookdiy_api.db import db
from nookdiy_api.main import create_app

app = create_app()
manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command("db", MigrateCommand)


@manager.command
def create_tables():
    db.create_all()


@manager.command
def drop_tables():
    db.drop_all()


if __name__ == "__main__":
    manager.run()
