import { Transition } from '@headlessui/react'
import Tippy from '@tippyjs/react'
import { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import { mapACNHDataToTailwind } from './Colors'
import { Item } from './Item'

interface ItemCardProps {
    itemData: Item
    isShowing: boolean
    transition: typeof Transition
    focusMe: (arg0: Item, arg1: MouseEvent<HTMLAnchorElement>) => null
}

export default function ItemCard(props: ItemCardProps) {
    return (
        <Tippy
            className="font-bold"
            content={props.itemData.name}
            delay={[100, 0]}
            duration={0}
        >
            <Link
                to={{
                    pathname: 'item',
                    search: props.itemData.name,
                }}
                state={{
                    ...props.itemData,
                    isShowing: props.isShowing,
                    transition: props.transition,
                }}
                className={
                    'border-8 border-brown-100 shadow-recipecard rounded-xl w-44 relative bg-cover bg-diyrecipe transition-transform transform hover:-rotate-3 hover:scale-110 hover:z-50 ' +
                    mapACNHDataToTailwind(props.itemData.card_color)
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
    )
}
