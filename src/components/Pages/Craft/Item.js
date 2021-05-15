import React from 'react'
import "./Item.scss"

export default class Item extends React.Component {
    render() {
        return (
            <div className="col col-md-3">
                <div className={"card diyrecipe diyrecipe-" + this.props.itemData.card_color}>
                    <img src={this.props.itemData.image_url} alt={this.props.itemData.name}/>
                </div>
            </div>
        )
    }
}
