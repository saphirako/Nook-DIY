import React from "react";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import "tippy.js/dist/tippy.css";

const mapACNHDataToTailwind = {
    red: "bg-acnh-red",
    yellow: "bg-acnh-yellow",
    green: "bg-acnh-green",
    blue: "bg-acnh-blue",
    brick: "bg-acnh-brick",
    light: "bg-acnh-light",
    pink: "bg-acnh-pink",
    beige: "bg-acnh-beige",
    brown: "bg-acnh-brown",
    orange: "bg-acnh-orange",
    "dark-gray": "bg-acnh-dark-gray",
    white: "bg-acnh-white",
    gold: "bg-acnh-gold border-acnh-gold-border",
    silver: "bg-acnh-silver border-acnh-silver-border",
};

export default function SingleItem(props) {
    return (
        <Tippy
            className="font-bold"
            content={props.itemData.name}
            delay={[100, 0]}
            duration={0}
        >
            <Link
                to={{
                    history: {pathname: "/item"},
                    search: props.itemData.name,
                    state: props.itemData,
                    isShowing: props.isShowing,
                    transition: props.transition,
                }}
                className={
                    "border-8 border-brown-100 shadow-recipecard rounded-xl w-44 relative bg-cover bg-diyrecipe transition-transform transform hover:-rotate-3 hover:scale-110 hover:z-50 " +
                    mapACNHDataToTailwind[props.itemData.card_color]
                }
                onClick={(event) => props.focusMe(props.itemData, event)}
            >
                <img
                    alt={props.itemData.name}
                    className="absolute w-auto h-auto max-h-full max-w-full top-0 bottom-0 left-0 right-0 m-auto"
                    src={props.itemData.image_url}
                />
            </Link>
        </Tippy>
    );
}
