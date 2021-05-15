import React, { Component, createRef } from 'react'
import './MenuAutocomplete.css'
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
        let classes = "menu-item new-menu-item"

        if (this.state.hasMargin) {
            classes += " new-menu-item-margin"
        }

        if (this.state.possibleMatches) {
            matches = this.state.possibleMatches.map((match) => <p key={match} onClick={this.selectMaterial.bind(this)}>{match}</p>)
        }

        return (
            <>
                <input ref={this.inputObject} className={classes} type="text" placeholder="+&nbsp;&nbsp;&nbsp;add a material" onChange={this.onChange.bind(this)} />
                {matches}
            </>

        )
    }
}
