import React from 'react'
import MenuAutoComplete from './MenuAutocomplete'
import MenuItem from './MenuItem';
import { Switch } from '@headlessui/react'



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
            materialList[materialName] = { image: materialImage, quantity: 0 }

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
        this.updateCraftPageMaterialFilter({ name: materialName, count: quantity })

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
        // Create the list of filters to show below the material list
        const filterList = <div>
            <p className="text-2xl my-4">Filter Options</p>
            {Object.keys(this.props.filterPresets).map(filter =>
                <div key={filter} className="w-full flex flex-row items-center gap-4">
                    <Switch
                        checked={this.props.filterPresets[filter].value}
                        onChange={ev => this.props.toggleFilter(filter)}
                        className={`${this.props.filterPresets[filter].value ? 'bg-brown-dark' : 'bg-brown'} relative inline-flex items-center h-6 rounded-full w-11 hover:bg-brown-light  focus:outline-none`}
                    >
                        <span className="sr-only" />
                        <span className={`${this.props.filterPresets[filter].value ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-gray-100 rounded-full`} />
                    </Switch>
                    <p className="w-auto font-light max-w-md">{this.props.filterPresets[filter].desc}</p>
                </div>
            )}
        </div>

        // <label key={filter} className="menu-checkbox" htmlFor={filter}>{this.props.filterPresets[filter].desc}
        //     <input id={filter} type="checkbox" onChange={ev => this.props.toggleFilter(filter)} />
        //     <span className="checkmark"></span>


        return (
            <div className="hidden h-3/5 justify-between lg:flex flex-col gap-y-4 justify-items-start w-full max-w-xs 2xl:max-w-lg my-4">
                <div className="rounded-xl bg-brown">
                    {this.state.addedMaterials}
                    <MenuAutoComplete addMaterialToList={this.addMaterialToList.bind(this)} />
                </div>

                {/* Checkbox options for further filtering query results */}
                {filterList}
            </div>

        )
    }
}
