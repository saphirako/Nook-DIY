import hashlib
import logging
import os

import gdown
import pandas as pd
import pymysql
from dotenv import load_dotenv
from numpy import NaN as NULL_VALUE
from sqlalchemy import create_engine

from nookdiy_api.api import models
from nookdiy_api.main import create_app

# Get access to the environment variables
load_dotenv()

# create the apps do that our models can connect to the db
pymysql.install_as_MySQLdb()

# correct the logging level of the script
logging.basicConfig(level=logging.INFO)

# make connection to database
conn = (
    "mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}".format(**os.environ)
    if str(os.environ.get("TEST_ETL", False)).lower() == "true"
    else "sqlite:///:memory:"
)
dbc = create_engine(conn)


def check_update_needed():
    # download the files
    gdown.download(os.environ["ACNHAPI_SHEET_URI"], "theirs.xlsx", quiet=True)

    # get the hashes of the files
    their_hash = hashlib.md5(open("theirs.xlsx", "rb").read()).hexdigest()
    our_hash = hashlib.md5(open("ours.xlsx", "rb").read()).hexdigest()

    # if they are different, we need to update ours
    if their_hash != our_hash:
        logging.info("Changes detected! Overwriting our saved file to be the most recent.")
        os.remove("ours.xlsx")
        os.rename("theirs.xlsx", "ours.xlsx")
        return True

    # if they aren't, we need to remove the 'theirs' download
    else:
        os.remove("theirs.xlsx")

    # if we get here, double check that we aren't running
    return str(os.environ.get("TEST_ETL", False)).lower() == "true"


def extract():
    return pd.read_excel(open("ours.xlsx", "rb"), "Recipes")[
        [
            "Name",
            "#1",
            "Material 1",
            "#2",
            "Material 2",
            "#3",
            "Material 3",
            "#4",
            "Material 4",
            "#5",
            "Material 5",
            "#6",
            "Material 6",
            "Buy",
            "Sell",
        ]
    ]


def transform(raw_data):
    # Remove unsupported 'NFS' from int column 'Buy'
    raw_data["Buy"] = raw_data["Buy"].apply(lambda y: -1 if y == "NFS" else y)

    # Remove currently known recipes from raw_data:
    existing_recipes_query = pd.read_sql_query("SELECT * FROM recipe", dbc)
    existing_recipes = pd.DataFrame(existing_recipes_query)
    df = raw_data[~raw_data["Name"].isin(existing_recipes["name"])]

    logging.info(f" Transform Report: ADD {len(df)} new recipes")
    return df

def load(formatted_data):
    if len(formatted_data) > 0:
        # Go through row-for-row looking for new recipe/items & materials:
        for _, row in formatted_data.iterrows():
            # Look up the current row's item
            existing_item = models.ItemModel.find_by_name(row["Name"])

            # Dynamically look through the rows materials for new materials to create
            existing_materials = []
            new_materials = []
            for c in range(1, 6):
                if row[f"Material {c}"] is not NULL_VALUE:
                    existing_material = models.MaterialModel.find_by_name(row[f"Material {c}"])
                    if existing_material is not None:
                        existing_materials.append(existing_material)
                    else:
                        new_materials.append(models.MaterialModel(name=row[f"Material {c}"]))
                else:
                    break

            # Look up the current row's recipe
            existing_recipe = models.RecipeModel.find_by_name(row["Name"])

            # If there are new materials, we need to create them
            if len(new_materials) > 0:
                for mat in new_materials:
                    mat.save_to_db()

                # combine these new materials with the existing ones
                existing_materials.extend(new_materials)

            # If there is no existing item, we need to create one
            if existing_item is None:
                existing_item = models.ItemModel(name=row["Name"], buy=row["Buy"], sell=row["Sell"])
                existing_item.save_to_db()

            # If there is no existing recipe, we need to create one
            if existing_recipe is None:
                existing_recipe = models.RecipeModel(name=row["Name"], item_id=existing_item.id)
                existing_recipe.save_to_db()

                for index in range(0, len(existing_materials)):
                    mat_rec = models.RecipeComponentModel(
                        recipe_id=existing_recipe.id,
                        material_id=existing_materials[index].id,
                        quantity=row[f"#{index+1}"],
                    )
                    mat_rec.save_to_db()

if __name__ == "__main__":
    if check_update_needed():
        logging.info(" Creating app & pushing context")
        app = create_app()
        app.app_context().push()

        logging.info(" Starting ETL process")
        logging.info(" EXTRACT")
        raw_data = extract()

        logging.info(" TRANSFORM")
        formatted_data = transform(raw_data)

        logging.info(" LOADING DATA")
        load(formatted_data)

        logging.info(" DONE!")

    else:
        logging.info(" No update is needed at this time!")
