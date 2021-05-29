import React, { Component, createRef } from 'react'
import materials from 'data/materials.json'


export default class MenuAutocomplete extends Component {
    constructor(props) {
        super(props);
        this.addMaterialToList = this.props.addMaterialToList;
        this.inputObject = createRef();
        this.state = {
            materials: materials,
            materialsList: Object.keys(materials),
            possibleMatches: null,
            hasMargin: false
        }
    }


    onChange(event) {
        const substring = event.target.value;

        if (substring.length > 0) {
            this.setState(prevState => ({ ...prevState, possibleMatches: this.state.materialsList.filter(material => material.includes(substring.toLowerCase())) }));
        }
        else {
            this.setState(prevState => ({ ...prevState, possibleMatches: [] }));
        }
    }


    selectMaterial(event) {
        let selectedMaterial = event.target.innerText.toLowerCase();
        this.setState(prevState => ({
            ...prevState,
            hasMargin: this.addMaterialToList(selectedMaterial, prevState.materials[selectedMaterial]) > 0,
            possibleMatches: null
        }));
        this.inputObject.current.value = "";
    }


    toggleBottomMargin() {
        this.setState({ "hasMarginAdded": !this.state.hasMarginAdded })
    }


    render() {
        let matches = [];
        if (this.state.possibleMatches && this.state.possibleMatches.length > 0) {
            matches = <div className="p-4 pt-0 max-h-56 overflow-y-auto">
                {this.state.possibleMatches.map((match) => <p className="font-light py-2" key={match} onClick={this.selectMaterial.bind(this)}>{match}</p>)}
            </div>
        }

        return (
            <>
                <input className="w-full p-4 rounded-2xl font-bold bg-brown placeholder-brown-dark text-brown-dark focus:outline-none" ref={this.inputObject} type="text" placeholder="+&nbsp;&nbsp;&nbsp;add a material" onChange={this.onChange.bind(this)} />
                {matches}
            </>

        )
    }
}
