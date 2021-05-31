import React from 'react'
import Menu from './Menu'
import Recipes from './Recipes';
import SimpleBar from 'simplebar-react';
import 'static/stylesheets/simplebar.css';


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
            },
            itemHasFocus: {
                value: false,
                item: null
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

    focusItem(item) {
        this.setState(prevState => ({
            ...prevState,
            itemHasFocus: {
                value: true,
                item: item
            }
        }))
    }

    render() {
        return (
            window.screen.width >= 1024 ? 
            <SimpleBar className="h-3/4" autoHide={false}>
                <div className="flex flex-row justify-center place-items-stretch gap-x-10 mx-16 xl:mx-0">
                    <Recipes
                        recipes={this.props.recipes}
                        filterBy={this.state.selectedMaterials}
                        filterPresets={this.state.filterPresets}
                        focusItem={this.focusItem.bind(this)}
                    />
                    <Menu
                        addMaterialToFilterList={this.addMaterialToFilterList.bind(this)}
                        updateMaterialFilterList={this.updateMaterialFilterList.bind(this)}
                        filterPresets={this.state.filterPresets}
                        toggleFilter={filterToToggle => {
                            // Update the state to match the values in the form
                            this.setState(prevState => ({
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
            </SimpleBar>
            :
            <p className="h-screen text-center font-bold flex flex-col px-8 justify-center">The craft page is currently unavailable for mobile users. Please use the Desktop verison or try again later!</p>
        )
    }
}
