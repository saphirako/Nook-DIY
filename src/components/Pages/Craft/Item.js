import React from 'react'
import Tippy from '@tippyjs/react'
import { Link } from 'react-router-dom'
import "./Item.scss"
import 'tippy.js/dist/tippy.css'

export default class Item extends React.Component {
    render() {
        return (
            <Tippy className="font-bold" content={this.props.itemData.name} delay={[100, 0]} duration={0}>
                <Link to={{
                    pathname: "/item",
                    search: this.props.itemData.name,
                    state: this.props.itemData
                }}
                    className={"border-8 border-brown-100 shadow-recipecard rounded-xl w-44 relative bg-cover bg-diyrecipe transition-transform transform hover:-rotate-3 hover:scale-110 hover:z-50 diyrecipe-" + this.props.itemData.card_color}
                    onClick={() => this.props.focusMe(this.props.itemData)}>
                    <img
                        alt={this.props.itemData.name}
                        className="absolute w-auto h-auto max-h-full max-w-full top-0 bottom-0 left-0 right-0 m-auto"
                        src={this.props.itemData.image_url}
                    />
                </Link>
            </Tippy>
        )
    }
}
