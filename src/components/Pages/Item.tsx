import { useContext } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import * as MaterialIcon from "data/materials.json";
import { Currency, Ingredient, MaterialName } from "components/Recipe";
import { sourceMap } from "components/Item";
import { RecipeContext } from "components/Contexts/RecipeContext";
import { ArrowLeftIcon, InformationCircleIcon, LockClosedIcon } from "@heroicons/react/20/solid";

interface BannerProps {
    className: string;
    label: string;
    tooltip?: string;
    onClick?: Function;
    icon?: any;
}
const Banner = (props: BannerProps) => {
    const Icon = props.icon;
    const bannerInternals = (
        <div
            className={
                "flex flex-row justify-end -ml-4 py-4 px-8 h-16 text-white rounded-2xl min-w-min max-w-max items-center gap-4 transition transform hover:scale-110 " +
                props.className
            }
        >
            {props.icon ? <Icon className="w-12 fill-current" /> : ""}
            <p>{props.label}</p>
        </div>
    );

    // If this Banner has a tooltip, wrap it. Otherwise just display the banner.
    return props.tooltip ? (
        <Tippy
            className="font-bold text-xl"
            content={props.tooltip ? props.tooltip : ""}
            placement="right"
            delay={[500, 0]}
            duration={0}
        >
            {bannerInternals}
        </Tippy>
    ) : (
        bannerInternals
    );
};

function ItemBuySell(props: Currency) {
    return (
        <div className="flex flex-col w-32 h-32 -m-4 rounded-full bg-brown-100 p-2 text-center items-center justify-center">
            <p className="font-extrabold">{props.type}</p>
            <img
                className="w-1/2"
                src={
                    props.currency === "Bells"
                        ? "https://acnhcdn.com/latest/MenuIcon/MoneyBag010.png"
                        : "https://dodo.ac/np/images/1/10/Nook_Miles_NH_Icon.png"
                }
                alt={`${props.type} ${props.currency} icon}`}
            />
            <p className="font-light">{props.value}</p>
        </div>
    );
}

function RecipeIngredient(props: Ingredient) {
    return (
        <div className="flex flex-row w-5/6 hd:w-3/5 justify-between items-center text-xl">
            <img
                className="absolute w-16 h-auto"
                src={MaterialIcon[props.name]}
                alt={`${props.name} menu icon`}
            />
            <p className="pl-16 capitalize">{props.name}</p>
            <p className="w-12 text-center">x{props.count}</p>
        </div>
    );
}

function getSourceImage(source: string) {
    if (Object.keys(sourceMap).includes(source)) return sourceMap[source];
    if (source.includes(" diy") || source.includes("recipe")) return sourceMap.DIY;
    return sourceMap.DEFAULT;
}

export default function Item() {
    const { selectedRecipe } = useContext(RecipeContext);

    return selectedRecipe !== null ? (
        <div className="h-3/4 py-12 bg-brown-200 flex flex-row justify-between text-brown-600 overflow-hidden rounded-md">
            {/*  Left: banners and external links */}
            <div className="h-auto flex flex-col justify-between w-1/4 xl:w-1/5">
                {/*Banner Bar */}
                <div className="flex flex-col gap-2">
                    {/*  Go back banner */}
                    <Link
                        to="/"
                        // onClick={(event) => forceTransition(event)}
                    >
                        <Banner
                            className="bg-red-500"
                            label="Back to the craft page"
                            icon={ArrowLeftIcon}
                        />
                    </Link>

                    {/* If there's an unlock pre-req, display it here*/}
                    {selectedRecipe.recipes_to_unlock > 0 ? (
                        <Banner
                            className="bg-brown-600"
                            tooltip="The required number of recipes you need to know to be able to unlock this DIY recipe. (Unless you unlocked it from Tom Nook in early-game.)"
                            icon={LockClosedIcon}
                            label={selectedRecipe.recipes_to_unlock.toString()}
                        />
                    ) : null}

                    {/* Nookipedia Link */}
                    <a href={selectedRecipe.url} target="_blank" rel="noreferrer">
                        <Banner
                            className="bg-nookipedia pb-3"
                            tooltip="View this item's article on Nookipedia"
                            label="Nookipedia"
                            icon={InformationCircleIcon}
                        />
                    </a>
                    {/* <a className="w-4/5" href={props.state.url}><img src="https://dodo.ac/np/images/1/1e/Nookipedia_Logo_Outlined.png" alt="Nookipedia logo" /></a> */}
                </div>

                {/*Availibility bar*/}
                <div className="w-5/6 rounded-2xl -ml-4 p-4 pl-8 bg-brown-100">
                    <p className="text-xl">Obtained from:</p>
                    <div className="flex flex-row gap-2">
                        {selectedRecipe.availability.map((source) => (
                            <Tippy
                                key={source.from}
                                className="font-bold"
                                placement="bottom-end"
                                content={
                                    source.note !== ""
                                        ? `${source.from} (${source.note})`
                                        : source.from
                                }
                            >
                                <img
                                    className="w-1/4"
                                    src={getSourceImage(source.from.toLowerCase())}
                                    alt={source.from + " icon"}
                                />
                            </Tippy>
                        ))}
                    </div>
                </div>
            </div>

            {/*  Middle: Item image and purchase/sell info */}
            <div className="w-1/2 xl:w-3/5 h-auto flex flex-col justify-center items-center">
                <p className="font-extrabold text-4xl text-center py-4">{selectedRecipe.name}</p>
                <img src={selectedRecipe.image_url} alt={`${selectedRecipe.name} in-game`} />
                <div className="p-16 flex flex-row">
                    {selectedRecipe.buy.map((transaction) => (
                        <ItemBuySell
                            type="Buy"
                            value={transaction.price}
                            currency={transaction.currency}
                        />
                    ))}
                    {selectedRecipe.sell > 0 ? (
                        <ItemBuySell type="Sell" value={selectedRecipe.sell} currency="Bells" />
                    ) : (
                        ""
                    )}
                </div>
            </div>

            {/* Right: Item build info */}
            <div className="w-1/4 xl:w-1/5 flex flex-col -mr-2 xl:-mr-8 gap-10 rounded-2xl p-4 pr-0 bg-brown-100 self-center justify-center items-start h-auto">
                {Object.keys(selectedRecipe.materials).map((ingredient: MaterialName) => (
                    <RecipeIngredient
                        name={ingredient}
                        key={ingredient}
                        count={selectedRecipe.materials[ingredient]}
                    />
                ))}
            </div>
        </div>
    ) : (
        <p>loading</p>
    );
}
