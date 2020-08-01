import traceback

from flask_restx import Namespace, Resource

from nookdiy_api.api.models import ItemModel

# Create the Namespace for this resource:
namespace = Namespace(
    name="Item",
    description="Access individual/all items from the 'item' table of the Marukochan DB",
    path="",
)


@namespace.route("")
class Items(Resource):
    @namespace.doc(
        description="Returns a summary list of all items in the DB",
        responses={
            200: "Success",
            500: "Something went wrong trying to get the list of projects on the BackEnd",
        },
    )
    def get(self):
        try:
            items = ItemModel.get_all_items()
            return {"items": items}, 200

        except Exception:
            traceback.print_exc()

        return (
            {
                "message": "Something went wrong getting all items. Contact @saphirako to check the server logs."
            },
            500,
        )


@namespace.route("/<int:item_id>")
class Item(Resource):
    @namespace.doc(
        description="Return more information about a given item",
        responses={
            200: "Success",
            404: "Could not find specified item",
            500: "Something went wrong trying to get the list of projects on the BackEnd",
        },
    )
    def get(self, item_id):
        try:
            item = ItemModel.find_by_id(item_id)
            return (
                ({"item": item.json(verbose=True)}, 200)
                if item
                else ({"message": f"item with id '{item_id}' could not be found"}, 404)
            )

        except Exception:
            traceback.print_exc()

        return (
            {
                "message": "Something went wrong getting a specific item. Contact @saphirako to check the server logs."
            },
            500,
        )
