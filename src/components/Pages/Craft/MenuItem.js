import React from 'react'
import "./MenuItem.css"

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.inputField = React.createRef();
        this.updateMaterialQuantity = this.props.updateMaterialQuantity;
        this.state = {
            materialName: this.props.materialName,
            materialImage: this.props.materialImage,
            isTarget: this.props.isTarget,
            isOffset: this.props.offset
        }
    }


    componentDidMount() {
        if (this.state.isTarget) {
            this.inputField.current.focus();
        }
    }

    // Whenever the TextField for this material loses document focus
    onBlur() {
        // If the field has anything in it, we need to update the request to Nookipedia (even if removing)
        if (this.inputField.current.value) {
            this.updateMaterialQuantity(this.state.materialName, parseInt(this.inputField.current.value))
        }
    }

    removeFromList() {
        this.updateMaterialQuantity(this.state.materialName, 0)
    }

    render() {
        let classes = "row menu-item exisiting-menu-item";

        if (this.state.isOffset % 2 === 1)
            classes += " exisiting-menu-item-offset"

        return (
            <div className={classes}>
                <img className="col col-md-2" src={this.state.materialImage} alt={"Inventory icon for " + this.state.materialName + " material."} />
                <p className="col col-md-6 vertical-center">{this.state.materialName}</p>
                <button className="button-outlined button-small button-round vertical-center" onClick={this.removeFromList.bind(this)}>✖</button>
                <input ref={this.inputField} className="col col-md-2" type="number" placeholder=""  onBlur={this.onBlur.bind(this)}/>
            </div>
        )
    }
}
