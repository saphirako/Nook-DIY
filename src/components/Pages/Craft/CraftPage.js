import React from 'react'
import Menu from './Menu'
import Recipes from './Recipes';

// Dummy data to delete once we have access to the Nookipedia API
// For dummy data, see temp_recipes.json


export default class CraftPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: this.props.recipes,
            selectedMaterials: {},
            filterPresets: {
                craftable: {
                    desc: "Only show craftable recipes",
                    value: false
                }
            }
        }
    }

    addMaterialToFilterList(newMaterial) {
        let { selectedMaterials } = this.state;

        // If we already have this item in the list, return outright.
        if (newMaterial.name in Object.keys(selectedMaterials)) return false;

        // If we reach this, it's a new material -- time to filter:
        // Add to list of matrials
        selectedMaterials[newMaterial.name] = newMaterial.count;

        // Update the state
        this.setState(prevState => ({
            ...prevState,
            selectedMaterials: selectedMaterials
        }))

        return true;
    };

    updateMaterialFilterList(material) {
        let { selectedMaterials } = this.state;
        
        if (material.count === 0) delete selectedMaterials[material.name]
        else selectedMaterials[material.name] = material.count

        this.setState(prevState => ({
            ...prevState,
            selectedMaterials: selectedMaterials
        }));
    }

    render() {
        return (
            <div className="row" style={{ height: "70vh", overflow: "hidden" }}>
                <Recipes
                    recipes={this.props.recipes}
                    filterBy={this.state.selectedMaterials}
                    filterPresets={this.state.filterPresets}
                />
                <Menu
                    addMaterialToFilterList={this.addMaterialToFilterList.bind(this)}
                    updateMaterialFilterList={this.updateMaterialFilterList.bind(this)}
                    filterPresets={this.state.filterPresets}
                    toggleFilter={filterToToggle => {
                        // Update the state to match the values in the form
                        this.setState(prevState=>({
                            filterPresets: {
                                ...prevState.filterPresets,
                                [filterToToggle]: {
                                    desc: prevState.filterPresets[filterToToggle].desc,
                                    value: !prevState.filterPresets[filterToToggle].value
                                }
                            }
                        }))
                    }}
                />
            </div>
        )
    }
}
