import traceback

from flask import request
from flask_restx import Namespace, Resource

from nookdiy_api.api.models import RecipeComponentModel, RecipeModel

# Create the Namespace for this resource:
namespace = Namespace(
    name="Recipe",
    description="Access individual/all recipes from the 'recipe' table of the Marukochan DB",
    path="",
)


@namespace.route("")
class Recipes(Resource):
    @namespace.doc(
        description="Returns a summary list of all recipes in the DB",
        responses={
            200: "Success",
            500: "Something went wrong trying to get the list of projects on the BackEnd",
        },
    )
    def get(self):
        try:
            recipes = RecipeModel.get_all_recipes()
            return {"recipes": recipes}, 200

        except Exception:
            traceback.print_exc()

        return (
            {
                "message": "Something went wrong getting all recipes. Contact @saphirako to check the server logs."
            },
            500,
        )

    @namespace.doc(
        description="Given ingredients and quantities, return a list of craftable items",
        responses={
            200: "Success",
            400: "Body is missing. Please provide some materials by which to filter",
            500: "Something went wrong trying to get the list of projects on the BackEnd",
        },
    )
    def post(self):
        # Get the list of materials from request
        in_stock = request.json.get("materials", [])

        # make sure there's _something_ in the request body
        if in_stock:
            possible_recipes = RecipeComponentModel.find_by_components(in_stock)
            converted_recipes = [rec.json() for rec in possible_recipes]
            return converted_recipes, 200

        else:
            return {"message": "No materials were provided!"}, 400

        return (
            {
                "message": "Something went wrong getting recipes. Contact @saphirako to check the server logs."
            },
            500,
        )


@namespace.route("/<int:recipe_id>")
class Recipe(Resource):
    @namespace.doc(
        description="Return more information about a given item",
        responses={
            200: "Success",
            404: "Recipe not found",
            500: "Something went wrong trying to get the list of projects on the BackEnd",
        },
    )
    def get(self, recipe_id):
        try:
            recipe = RecipeModel.find_by_id(recipe_id)
            return (
                (recipe.json(verbose=True), 200)
                if recipe
                else ({"message": f"recipe with id '{recipe_id}' could not be found"}, 404)
            )
        except Exception:
            traceback.print_exc()

        return (
            {
                "message": "Something went wrong getting recipe . Contact @saphirako to check the server logs."
            },
            500,
        )
