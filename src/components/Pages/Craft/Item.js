import React from 'react'
import "./Item.scss"

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.itemData;
    }

    render() {
        return (
            <div className="col col-md-3">
                <div className="card diyrecipe">
                    <img src={this.state.image_url} alt={this.state.name}/>
                </div>
            </div>
        )
    }
}
