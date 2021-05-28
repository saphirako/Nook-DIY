import React from 'react'
import "./Item.scss"

export default class Item extends React.Component {
    render() {
        return (
            <div className={"border-8 border-diycard shadow-recipecard rounded-xl w-44 h-60 relative bg-cover bg-diyrecipe transition-transform transform hover:-rotate-3 hover:scale-110 hover:z-50 diyrecipe-" + this.props.itemData.card_color}>
                <img
                    className="absolute w-auto h-auto max-h-full max-w-full top-0 bottom-0 left-0 right-0 m-auto"
                    src={this.props.itemData.image_url} f5f0e2
                    alt={this.props.itemData.name}
                />
            </div>
        )
    }
}
