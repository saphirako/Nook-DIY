import React from 'react'
import './Menu.css'
import MenuAutoComplete from './MenuAutocomplete'
import MenuItem from './MenuItem';


export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.giveCraftPageNewMaterial = this.props.addMaterialToFilterList;
        this.updateCraftPageMaterialFilter = this.props.updateMaterialFilterList;
        this.state = {
            itemCount: 0,
            materialList: {},
            addedMaterials: null
        }
    }

    // Used to create the list of materials added by the user
    generateMaterialList(materialList, targetMaterial) {
        return Object.keys(materialList).map((material, index) => (
            <MenuItem
                key={material}
                offset={index}
                materialName={material}
                isTarget={material === targetMaterial}
                materialImage={materialList[material].image}
                updateMaterialQuantity={this.updateMaterialQuantity.bind(this)}
            />));
    }


    // Used by AutoComplete to add margin and get new materials for the list
    addMaterialToList(materialName, materialImage) {
        // Add the item to CraftPage's list
        let updateNeeded = this.giveCraftPageNewMaterial({
            name: materialName,
            count: null
        })

        // Keep a copy to guarantee correct value returned to AutoComplete
        let { itemCount, materialList } = this.state;

        // If we're adding a new item, update the state and return count+1 to AutoComplete
        if (updateNeeded) {
            // Add the item to the materialList
            materialList[materialName] = {image: materialImage, quantity: 0}

            // Update the Menu's visual representation
            let newAddedMaterials = this.generateMaterialList(materialList, materialName);

            this.setState(prevState => ({
                ...prevState,
                materialList: materialList,
                addedMaterials: newAddedMaterials,
                itemCount: prevState.itemCount + 1
            }));

            return itemCount + 1;
        }

        //  Otherwise, return same count ot AutoComplete
        else return itemCount;
    }


    // Used to add change material quanities in Recipe filtering (and remove )
    updateMaterialQuantity(materialName, quantity) {
        // Update CraftPage's list (for Recipes)
        this.updateCraftPageMaterialFilter({name: materialName, count: quantity})

        // Update the Menu's visual representation
        let { materialList } = this.state;
        if (quantity === 0) delete materialList[materialName]
        else materialList[materialName].quantity = quantity;
        let newAddedMaterials = this.generateMaterialList(materialList)

        this.setState(prevState => ({
            ...prevState,
            materialList: materialList,
            addedMaterials: newAddedMaterials
        }));
    }


    render() {
        return (
            <div className="col col-md-4">
                <div className="panel">
                    {this.state.addedMaterials}
                    <MenuAutoComplete addMaterialToList={this.addMaterialToList.bind(this)} />
                </div>

                {/* Checkbox options for further filtering query results */}
                <label className="menu-checkbox" htmlFor="exact-match">Exact matches only
                    <input id="exact-match" type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="menu-checkbox" htmlFor="seasonal-match">Resources seasonally available
                    <input id="seasonal-match" type="checkbox" />
                    <span className="checkmark"></span>
                </label>
            </div>

        )
    }
}
