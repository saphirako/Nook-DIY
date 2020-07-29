from flask import Blueprint
from flask_restx import Api, fields

# Create a Blueprint object which will handle all of the Swagger documentation loading
blueprint = Blueprint("api", __name__)

# Create a Flask-RestX API Object
api = Api(
    app=blueprint,
    title="nookdiy.me API",
    version="1.0",
    description="API which parses [ACNHAPI's](http://acnhapi.com/) excel sheet and renders from a mySQL database",
    prefix="",
)

# Add the namespaces we create in each resource with a specified path
api.namespaces = []
