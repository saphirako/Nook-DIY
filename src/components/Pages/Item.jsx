import React, { Component } from 'react'
import { ReactComponent as Hammer } from 'static/image/Hammer.svg'
import { ReactComponent as NookipediaLogo } from 'static/image/Nookipedia.svg'
import { Transition } from '@headlessui/react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { Link, Redirect } from 'react-router-dom'
import MaterialIcons from 'data/materials.json'

function Banner(props) {
    const bannerInternals = <div className={"flex flex-row justify-end -ml-4 py-4 px-8 text-white rounded-2xl min-w-min max-w-max items-center gap-4 transition transform hover:scale-110 hover:text-4xl " + props.className}>{props.children}</div>

    return props.tooltip ?
        <Tippy className="font-bold text-2xl" content={props.tooltip ? props.tooltip : ""} placement="right" delay={[100, 0]} duration={0}>
            {bannerInternals}
        </Tippy>
        :
        bannerInternals
}


function ItemBuySell(props) {
    return <div className="flex flex-col w-32 h-32 -m-4 rounded-full bg-brown-100 p-2 text-center items-center justify-center">
        <p className="font-extrabold">{props.type}</p>
        <img className="w-1/2" src={props.currency === "Bells" ? "https://acnhcdn.com/latest/MenuIcon/MoneyBag010.png" : "https://dodo.ac/np/images/1/10/Nook_Miles_NH_Icon.png"} alt={`${props.type} ${props.currency} icon}`} />
        <p className="font-light">{props.value}</p>
    </div>
}

function RecipeIngredient(props) {
    return <div className="flex flex-row w-5/6 hd:w-3/5 justify-between items-center text-xl">
        <img className="absolute w-16 h-auto" src={MaterialIcons[props.name.toLowerCase()]} alt={`${props.name} menu icon`} />
        <p className="pl-16 capitalize">{props.name}</p>
        <p className="w-12 text-center">x{props.quantity}</p>
    </div>
}

const sourceMap = {
    "Tom Nook": "https://acnhcdn.com/latest/NpcIcon/rco.png",
    "Blathers": "https://acnhcdn.com/latest/NpcIcon/owl.png",
    "Balloons": "https://acnhcdn.com/latest/MenuIcon/Present.png",
    "Reese": "https://acnhcdn.com/latest/NpcIcon/alw.png",
    "Cyrus": "https://acnhcdn.com/latest/NpcIcon/alp.png",
    "Leif": "https://acnhcdn.com/latest/NpcIcon/slo.png",
    "Gulliver": "https://acnhcdn.com/latest/NpcIcon/gul.png",
    "Gullivarrr": "https://acnhcdn.com/latest/NpcIcon/gul.png",
    "Harvey": "https://acnhcdn.com/latest/NpcIcon/spn.png",
    "Jack": "https://acnhcdn.com/latest/NpcIcon/pkn.png",
    "Jingle": "https://acnhcdn.com/latest/NpcIcon/rei.png",
    "Franklin": "https://acnhcdn.com/latest/NpcIcon/tuk.png",
    "Celeste": "https://acnhcdn.com/latest/NpcIcon/ows.png",
    "Pavé": "https://acnhcdn.com/latest/NpcIcon/pck.png",
    "Saharah": "https://acnhcdn.com/latest/NpcIcon/cml.png",
    "Timmy": "https://acnhcdn.com/latest/NpcIcon/rcm.png",
    "Tommy": "https://acnhcdn.com/latest/NpcIcon/rct.png",
    "Zipper": "https://acnhcdn.com/latest/NpcIcon/pyn.png",
    "K.K.": "https://acnhcdn.com/latest/NpcIcon/tkkA.png",
    "Pascal": "https://acnhcdn.com/latest/NpcIcon/seo.png",
    "Isabelle": "https://acnhcdn.com/latest/NpcIcon/sza.png",
    "Lazy villager": "https://acnhcdn.com/latest/ManpuIcon/Sleepy.png",
    "Jock villager": "https://acnhcdn.com/latest/ManpuIcon/SmugFace.png",
    "Cranky villager": "https://acnhcdn.com/latest/ManpuIcon/Outraged.png",
    "Smug villager": "https://acnhcdn.com/latest/ManpuIcon/Grin.png",
    "Big sister villager": "https://acnhcdn.com/latest/ManpuIcon/Scheming.png",
    "Normal villager": "https://acnhcdn.com/latest/ManpuIcon/Smiling.png",
    "Peppy villager": "https://acnhcdn.com/latest/ManpuIcon/Cheering.png",
    "Snooty villager": "https://acnhcdn.com/latest/ManpuIcon/Negative.png",
    "Any villager": "https://acnhcdn.com/latest/ManpuIcon/AddViva.png",
    "Egg bottle": "https://acnhcdn.com/latest/MenuIcon/MessageBottleEgg.png",
    "DEFAULT": "https://acnhcdn.com/latest/MenuIcon/SeedPitfall.png",
    "DIY": "https://acnhcdn.com/latest/MenuIcon/BookRecipe.png",
    "Egg Bottle": "https://acnhcdn.com/latest/MenuIcon/MessageBottleEgg.png",
    "Egg Balloon": "https://acnhcdn.com/latest/MenuIcon/EggSky.png",
    "Snowboy": "https://acnhcdn.com/latest/MenuIcon/SnowCrystal.png",
    "Fishing": "https://acnhcdn.com/latest/FtrIcon/ToolAngling_Remake_0_0.png"
}

export default class Item extends Component {
    constructor(props) {
        super(props)
        this.state = props.location.state
        this.show = true
    }

    forceTransition(event) {
        if (this.props.location.transition === undefined) {
            window.location.href = event.currentTarget.origin
        } 

        this.show = false;
        this.props.location.transition(0, event)
    }


    render() {
        return this.state ? (
                <Transition
                    as={React.Fragment}
                    appear={true}
                    show={this.show}
                    enter="transform transition duration-300"
                    enterFrom="opacity-0 scale-125"
                    enterTo="opacity-100 scale-100"
                    leave="transform duration-300 transition ease-in-out"
                    leaveFrom="opacity-100 scale-100 "
                    leaveTo="opacity-0 scale-125 "
                >
                    <div className="h-3/4 py-12 bg-brown-200 flex flex-row justify-between text-brown-600 overflow-hidden">
                        {/*  Left: banners and external links */}
                        <div className="h-auto flex flex-col justify-between w-1/4 xl:w-1/5">
                            {/*Banner Bar */}
                            <div className="flex flex-col gap-2">
                                {/*  Go back banner */}
                                <Link to={{ pathname: "/" }} onClick={(event) => this.forceTransition(event)}>
                                    <Banner className="bg-red-500">
                                        <p>{"<- Back to the craft page"}</p>
                                    </Banner>
                                </Link>

                                {/* If there's an unlock pre-req, display it here*/}
                                {this.state.recipes_to_unlock > 0 ? (
                                    <Banner className="bg-brown-600" tooltip="The required number of recipes you need to know to be able to unlock this DIY reciepe. (Unless you unlocked it from Tom Nook in early-game.)">
                                        <Hammer className="w-12 fill-current" alt="Hammer" />
                                        <p className="text-5xl">{this.state.recipes_to_unlock}</p>
                                    </Banner>
                                ) : (null)}

                                {/* Nookipedia Link */}
                                <Link to={{ pathname: this.state.url }} target="_blank">
                                    <Banner className="bg-nookipedia" tooltip="View this items article on Nookipedia">
                                        <NookipediaLogo className="w-20" alt="Nookipedia Logo" />
                                    </Banner>
                                </Link>
                                {/* <a className="w-4/5" href={this.state.url}><img src="https://dodo.ac/np/images/1/1e/Nookipedia_Logo_Outlined.png" alt="Nookipedia logo" /></a> */}
                            </div>

                            {/*Availibility bar*/}
                            <div className="w-5/6 rounded-2xl -ml-4 p-4 pl-8 bg-brown-100">
                                <p className="text-xl">Obtained from:</p>
                                <div className="flex flex-row gap-2">
                                    {this.state.availability.map(source =>
                                        <Tippy key={source.from} className="font-bold" placement="bottom-end" content={["Tom Nook", "Balloons", "Cyrus", "Gulliver", "Gullivarrr", "Harvey", "Reese"].includes(source.from) ? `${source.from} (${source.note})` : source.from}>
                                            <img
                                                className="w-1/4"
                                                src={
                                                    Object.keys(sourceMap).includes(source.from) ? sourceMap[source.from] : (
                                                        source.from.toLowerCase().includes(" diy") || source.from.toLowerCase().includes("recipe") ? sourceMap.DIY : sourceMap.DEFAULT)} alt={source.from + " icon"} />
                                        </Tippy>)}
                                </div>
                            </div>
                        </div>

                        {/*  Middle: Item image and purchase/sell info */}
                        <div className="w-1/2 xl:w-3/5 h-auto flex flex-col justify-center items-center">
                            <p className="font-extrabold text-4xl text-center py-4">{this.state.name}</p>
                            <img src={this.state.image_url} alt={`${this.state.name} in-game`} />
                            <div className="p-16 flex flex-row">
                                {this.state.buy.map(transaction => <ItemBuySell type="Buy" value={transaction.price} currency={transaction.currency} />)}
                                {this.state.sell > 0 ? <ItemBuySell type="Sell" value={this.state.sell} currency="Bells" /> : ""}
                            </div>
                        </div>

                        {/* Right: Item build info */}
                        <div className="w-1/4 xl:w-1/5 flex flex-col -mr-2 xl:-mr-8 gap-10 rounded-2xl p-4 pr-0 bg-brown-100 self-center justify-center items-start h-auto">
                            {Object.keys(this.state.materials).map(ingredient => <RecipeIngredient name={ingredient} key={ingredient} quantity={this.state.materials[ingredient]} />)}
                        </div>
                    </div>
                </Transition>)
            :
            <Redirect to={{ pathname: "/" }} />
    }
}
