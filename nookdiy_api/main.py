import logging
import os

import pymysql
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from nookdiy_api.api import blueprint
from nookdiy_api.db import db

pymysql.install_as_MySQLdb()


def create_app(database=None):
    # Set log level to INFO and get environment variables
    logging.basicConfig(level=logging.INFO)
    load_dotenv()

    # Create the app and connection object
    app = Flask(__name__)
    is_test = os.environ.get("Testing", False) == "true"
    conn = "mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    # Determine if we're running locally:
    app_environment = os.environ.get("APP_ENVIRONMENT", None)
    if database == "LOCAL" or is_test:
        logging.info("Using sqlite memory db")
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"

    # If we're not running locally, use API secrets to set up DB connection
    else:
        logging.info(f" Detected environment:\t{app_environment}")
        app.config["SQLALCHEMY_DATABASE_URI"] = conn.format(**dict(os.environ))

    # Boilerplate Flask App/SQL Alchemy configs
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_ECHO"] = False
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = dict(pool_pre_ping=True)
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["DEBUG"] = False
    app.config["SECRET_KEY"] = os.environ.get("APP_SECRET_KEY", None)

    # Intialize the app
    app.register_blueprint(blueprint)
    db.init_app(app)
    CORS(app, supports_credentials=True)
    return app


if __name__ == "__main__":
    app = create_app()
    app.app_context().push()
    app.run()
