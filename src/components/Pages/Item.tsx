import { Fragment, ReactElement, useState } from 'react'
import { Transition } from '@headlessui/react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { Link, useNavigate } from 'react-router-dom'
import * as MaterialIcon from 'data/materials.json'
import { useLocation } from 'react-router-dom'
import {
    Currency,
    Ingredient,
    MaterialName,
    RecipeSource,
} from 'components/Recipe'
import { sourceMap, Transaction } from 'components/Item'
import { ReactComponent as Hammer } from 'static/image/Hammer.svg'

interface BannerProps {
    className: string
    children: ReactElement | ReactElement[]
    tooltip?: string
    onClick?: Function
}
function Banner(props: BannerProps) {
    const bannerInternals = (
        <div
            className={
                'flex flex-row justify-end -ml-4 py-4 px-8 h-16 text-white rounded-2xl min-w-min max-w-max items-center gap-4 transition transform hover:scale-110 ' +
                props.className
            }
        >
            {props.children}
        </div>
    )

    // If this Banner has a tooltip, wrap it. Otherwise just display the banner.
    return props.tooltip ? (
        <Tippy
            className="font-bold text-xl"
            content={props.tooltip ? props.tooltip : ''}
            placement="right"
            delay={[100, 0]}
            duration={0}
        >
            {bannerInternals}
        </Tippy>
    ) : (
        bannerInternals
    )
}

function ItemBuySell(props: Currency) {
    return (
        <div className="flex flex-col w-32 h-32 -m-4 rounded-full bg-brown-100 p-2 text-center items-center justify-center">
            <p className="font-extrabold">{props.type}</p>
            <img
                className="w-1/2"
                src={
                    props.currency === 'Bells'
                        ? 'https://acnhcdn.com/latest/MenuIcon/MoneyBag010.png'
                        : 'https://dodo.ac/np/images/1/10/Nook_Miles_NH_Icon.png'
                }
                alt={`${props.type} ${props.currency} icon}`}
            />
            <p className="font-light">{props.value}</p>
        </div>
    )
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
            <p className="w-12 text-center">x{props.quantity}</p>
        </div>
    )
}

interface ItemPageDefaultState {
    isShowing: boolean
    recipes_to_unlock: number
    url: string // Nookipedia URL
    availability: Array<{
        from: RecipeSource
        note: string
    }>
    image_url: string
    name: string
    buy: Transaction | Array<Transaction>
    sell: number
    materials: { [K in MaterialName]: number }
    rendered: boolean
}

export default function Item() {
    const location = useLocation()
    const navigate = useNavigate()
    const [state, setState] = useState({
        ...(location.state as ItemPageDefaultState),
    })

    // Prevent state-less render
    if (!location.state) return <></>

    if (!state.isShowing) {
        navigate(-1)
    }

    return (
        <Transition
            as={Fragment}
            appear={true}
            show={state.isShowing}
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
                        <Link
                            to="/"
                            // onClick={(event) => forceTransition(event)}
                        >
                            <Banner
                                className="bg-red-500"
                                onClick={() =>
                                    setState({ ...state, isShowing: false })
                                }
                            >
                                <p>{'<- Back to the craft page'}</p>
                            </Banner>
                        </Link>

                        {/* If there's an unlock pre-req, display it here*/}
                        {state.recipes_to_unlock > 0 ? (
                            <Banner
                                className="bg-brown-600"
                                tooltip="The required number of recipes you need to know to be able to unlock this DIY recipe. (Unless you unlocked it from Tom Nook in early-game.)"
                            >
                                <Hammer className="w-12 fill-current" />
                                <p className="text-5xl">
                                    {state.recipes_to_unlock.toString()}
                                </p>
                            </Banner>
                        ) : null}

                        {/* Nookipedia Link */}
                        <a href={state.url} target="_blank" rel="noreferrer">
                            <Banner
                                className="bg-nookipedia pb-3"
                                tooltip="View this item's article on Nookipedia"
                            >
                                <img
                                    src="https://dodo.ac/np/images/1/1e/Nookipedia_Logo_Outlined.png"
                                    className="w-32"
                                    alt="Nookipedia Logo"
                                />
                            </Banner>
                        </a>
                        {/* <a className="w-4/5" href={props.state.url}><img src="https://dodo.ac/np/images/1/1e/Nookipedia_Logo_Outlined.png" alt="Nookipedia logo" /></a> */}
                    </div>

                    {/*Availibility bar*/}
                    <div className="w-5/6 rounded-2xl -ml-4 p-4 pl-8 bg-brown-100">
                        <p className="text-xl">Obtained from:</p>
                        <div className="flex flex-row gap-2">
                            {state.availability.map((source) => (
                                <Tippy
                                    key={source.from}
                                    className="font-bold"
                                    placement="bottom-end"
                                    content={
                                        [
                                            'Tom Nook',
                                            'Balloons',
                                            'Cyrus',
                                            'Gulliver',
                                            'Gullivarrr',
                                            'Harvey',
                                            'Reese',
                                        ].includes(source.from)
                                            ? `${source.from} (${source.note})`
                                            : source.from
                                    }
                                >
                                    <img
                                        className="w-1/4"
                                        src={
                                            Object.keys(sourceMap).includes(
                                                source.from
                                            )
                                                ? sourceMap[source.from]
                                                : source.from
                                                      .toLowerCase()
                                                      .includes(' diy') ||
                                                  source.from
                                                      .toLowerCase()
                                                      .includes('recipe')
                                                ? sourceMap.DIY
                                                : sourceMap.DEFAULT
                                        }
                                        alt={source.from + ' icon'}
                                    />
                                </Tippy>
                            ))}
                        </div>
                    </div>
                </div>

                {/*  Middle: Item image and purchase/sell info */}
                <div className="w-1/2 xl:w-3/5 h-auto flex flex-col justify-center items-center">
                    <p className="font-extrabold text-4xl text-center py-4">
                        {state.name}
                    </p>
                    <img src={state.image_url} alt={`${state.name} in-game`} />
                    <div className="p-16 flex flex-row">
                        {Array.isArray(state.buy) ? (
                            state.buy.map((transaction: Transaction) => (
                                <ItemBuySell
                                    type="Buy"
                                    value={transaction.price}
                                    currency={transaction.currency}
                                />
                            ))
                        ) : (
                            <ItemBuySell
                                type="Buy"
                                value={state.buy.price}
                                currency={state.buy.currency}
                            />
                        )}
                        {state.sell > 0 ? (
                            <ItemBuySell
                                type="Sell"
                                value={state.sell}
                                currency="Bells"
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                {/* Right: Item build info */}
                <div className="w-1/4 xl:w-1/5 flex flex-col -mr-2 xl:-mr-8 gap-10 rounded-2xl p-4 pr-0 bg-brown-100 self-center justify-center items-start h-auto">
                    {Object.keys(state.materials).map(
                        (ingredient: MaterialName) => (
                            <RecipeIngredient
                                name={ingredient}
                                key={ingredient}
                                quantity={state.materials[ingredient]}
                            />
                        )
                    )}
                </div>
            </div>
        </Transition>
    )
}
