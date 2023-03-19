// import { Transition } from '@headlessui/react'
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { mapACNHDataToTailwind } from "./Colors";
import { Item } from "./Item";
import { Recipe } from "./Recipe";
import { RecipeContext } from "./Contexts/RecipeContext";

interface ItemCardProps {
    itemData: Item & Recipe;
    isShowing: boolean;
}

export default function ItemCard(props: ItemCardProps) {
    const navigate = useNavigate();
    const { selectRecipe } = useContext(RecipeContext);

    return (
        <div
            className={
                "border-8 border-brown-100 h-60 shadow-recipecard rounded-xl w-44 relative bg-cover bg-diyrecipe transition-transform transform hover:-rotate-3 hover:scale-110 group " +
                mapACNHDataToTailwind(props.itemData.card_color)
            }
            onClick={() => {
                selectRecipe(props.itemData);
                navigate("item");
            }}
        >
            <img
                alt={props.itemData.name}
                className="absolute w-auto h-auto max-h-full max-w-full top-0 bottom-0 left-0 right-0 m-auto"
                src={props.itemData.image_url}
            />
            <p className="absolute bottom-0 mb-2 inset-x-2 text-center rounded-full p-2 bg-neutral-700 text-white text-sm capitalize opacity-0 group-hover:opacity-100 duration-300">
                {props.itemData.name}
            </p>
        </div>
    );
}
