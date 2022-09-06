import React from 'react'

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props)
        this.inputField = React.createRef()
        this.updateMaterialQuantity = this.props.updateMaterialQuantity
        this.state = {
            materialName: this.props.materialName,
            materialImage: this.props.materialImage,
            isTarget: this.props.isTarget,
            isOffset: this.props.offset,
        }
    }

    componentDidMount() {
        if (this.state.isTarget) {
            this.inputField.current.focus()
        }
    }

    // Whenever the TextField for this material loses document focus
    onBlur() {
        // If the field has anything in it, we need to update the request to Nookipedia (even if removing)
        this.updateMaterialQuantity(
            this.state.materialName,
            parseInt(this.inputField.current.value)
        )
    }

    removeFromList() {
        this.updateMaterialQuantity(this.state.materialName, 0)
    }

    render() {
        return (
            <div
                className={
                    'flex rounded-xl p-2 ' + (this.props.offset % 2 === 1 ? 'bg-brown-300' : '')
                }
            >
                <img
                    className="w-16 h-auto"
                    src={this.state.materialImage}
                    alt={'Inventory icon for ' + this.state.materialName + ' material.'}
                />
                <div className="flex items-center justify-start gap-4 w-full mx-4">
                    <p className="capitalize">{this.state.materialName}</p>
                    <p
                        className="flex-grow-0 font-bold transition transform hover:scale-125 hover:text-red-500"
                        onClick={this.removeFromList.bind(this)}
                    >
                        ✖
                    </p>
                </div>
                <input
                    className="w-1/6 my-2 mr-4 bg-brown-500 text-center rounded focus:outline-none"
                    ref={this.inputField}
                    type="number"
                    placeholder=""
                    onBlur={this.onBlur.bind(this)}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') this.onBlur()
                    }}
                />
            </div>
        )
    }
}
