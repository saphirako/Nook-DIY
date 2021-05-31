import hashlib
import json
import logging
import os
from os.path import abspath, join

import gdown
import pandas as pd
from dotenv import load_dotenv
from numpy import NaN as NULL_VALUE

# Get access to the environment variables
load_dotenv()

# correct the logging level of the script
logging.basicConfig(level=logging.INFO)


def check_update_needed():
    # Make sure we we want to run with newest possible
    if str(os.environ.get("TEST_ETL", False)).lower() == "true":
        logging.info(" downloading latest spreadsheet")
        # download the files
        gdown.download(os.environ["REACT_APP_ACNHAPI_SHEET_URI"], "theirs.xlsx", quiet=True)

        # get the hashes of the files
        with open("theirs.xlsx", "rb") as f:
            their_hash = hashlib.md5(f.read()).hexdigest()

        with open("ours.xlsx", "rb") as f:
            our_hash = hashlib.md5(f.read()).hexdigest()

        # if they are different, we need to update ours
        if their_hash != our_hash:
            logging.info("Changes detected! Overwriting our saved file to be the most recent.")
            os.remove("ours.xlsx")
            os.rename("theirs.xlsx", "ours.xlsx")
            return True

        # if they aren't, we need to remove the 'theirs' download
        else:
            os.remove("theirs.xlsx")
            return False

    # If we aren't testingf using latest data, we still want to run
    logging.info(" Skipping file download -- using cached spreadsheet")
    return True


def extract():
    logging.info(" EXTRACT")

    # generate dataframes
    with open("ours.xlsx", "rb") as f:
        recipes_df = pd.read_excel(f, "Recipes")[
            [
                "Name",
                "Material 1",
                "Material 2",
                "Material 3",
                "Material 4",
                "Material 5",
                "Material 6",
                "Card Color",
            ]
        ]
        materials_df = pd.read_excel(f, "Other")[["Name", "Inventory Filename",]]
        tools_df = pd.read_excel(f, "Tools")[["Name", "Filename",]]
        furniture_df = pd.read_excel(f, "Housewares")[["Name", "Filename",]]
        misc_df = pd.read_excel(f, "Miscellaneous")[["Name", "Filename",]]

    # sanitize naming for sanity
    for i in range(1, 7):
        recipes_df[f"Material {i}"] = recipes_df[[f"Material {i}"]].apply(lambda x: x.str.lower())
    recipes_df["Card Color"] = recipes_df[["Card Color"]].apply(lambda x: x.str.lower())
    materials_df["Name"] = materials_df["Name"].str.lower()
    tools_df["Name"] = tools_df["Name"].str.lower()
    furniture_df["Name"] = furniture_df["Name"].str.lower()
    misc_df["Name"] = misc_df["Name"].str.lower()

    return recipes_df, materials_df, tools_df, furniture_df, misc_df


def transform(recipes_df, materials_df, tools_df, furniture_df, misc_df):
    logging.info(" TRANSFORM")
    material_data = {}
    recipe_color_data = {}

    with open(abspath(join("src", "data", "materials.json")), "r") as f:
        file_data = f.read()

        # Handle empty file error:
        material_data = json.loads(file_data) if file_data else material_data

    with open(abspath(join("src", "data", "colors.json")), "r") as f:
        file_data = f.read()

        # Handle empty file error:
        recipe_color_data = json.loads(file_data) if file_data else recipe_color_data

    known_materials = material_data.keys()
    new_materials = []
    no_new_recipes = True

    # TODO: Use a better pandas-like solution for the love of god.
    # Go through row-for-row 🤮 looking for new recipe/items & materials:
    for _, row in recipes_df.iterrows():
        if row["Name"] not in recipe_color_data:
            no_new_recipes = False
            recipe_color_data[row["Name"].lower()] = row["Card Color"] if row["Card Color"] is not NULL_VALUE else "NaN"

        # Process individual materials
        for c in range(1, 7):
            material = row[f"Material {c}"]
            if material is not NULL_VALUE:
                material = material.lower()
                # only add to new materials if it isn't already in there and we don't know about it
                if material not in known_materials and material not in new_materials:
                    new_materials.append(material)
            else:
                break

    if len(new_materials) == 0 and no_new_recipes:
        return [], []

    for material in new_materials:
        # Check for menu icons (most likely option):
        potential_match = materials_df[materials_df["Name"] == material][
            "Inventory Filename"
        ].reset_index(drop=True)
        if potential_match.size > 0:
            material_data[
                material
            ] = f"https://acnhcdn.com/latest/MenuIcon/{potential_match[0]}.png"
            continue

        # Check for furniture items (second most-likely):
        potential_match = furniture_df[furniture_df["Name"] == material]["Filename"].reset_index(
            drop=True
        )
        if potential_match.size > 0:
            material_data[material] = f"https://acnhcdn.com/latest/FtrIcon/{potential_match[0]}.png"
            continue

        # Check for misc icons:
        potential_match = misc_df[misc_df["Name"] == material]["Filename"].reset_index(drop=True)
        if potential_match.size > 0:
            material_data[material] = f"https://acnhcdn.com/latest/FtrIcon/{potential_match[0]}.png"
            continue

        # Check for tools icons:
        potential_match = tools_df[tools_df["Name"] == material]["Filename"].reset_index(drop=True)
        if potential_match.size > 0:
            material_data[material] = f"https://acnhcdn.com/latest/FtrIcon/{potential_match[0]}.png"
            continue

        logging.info(f" \tcannot find entry for '{material}'... And we tried extensively!")

    return material_data, recipe_color_data


def load(formatted_data, color_data):
    with open(abspath(join("src", "data", "materials.json")), "w") as f:
        f.write(json.dumps(formatted_data))

    with open(abspath(join("src", "data", "colors.json")), "w") as f:
        f.write(json.dumps(color_data))


if __name__ == "__main__":
    if check_update_needed():
        logging.info(" Starting ETL process")
        material_data, color_data = transform(*extract())

        logging.info(" LOADING DATA")
        if len(material_data) > 0:
            load(material_data, color_data)

        else:
            logging.info(" No load was needed. All materials are already known.")

        logging.info(" DONE!")

    else:
        logging.info(" No update is needed at this time!")
