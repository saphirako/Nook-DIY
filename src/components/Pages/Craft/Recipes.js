import React, { Component } from 'react'
import Item from './Item'
import './Recipes.css'
// import local_recipes from './temp_recipes.json' 

// const local_testing = true;

export default class Recipes extends Component {
    helper(filterMaterials, recipe) {
        let tmp = Object.keys(recipe.materials).filter(material => Object.keys(filterMaterials).includes(material))
        return tmp.length >= Object.keys(filterMaterials).length && tmp.length > 0
    }

    filterRecipes(materialsToFilter) {
        // Get recipes that have the provided materials in them at all
        let filtered = this.props.recipes.filter(
            recipe => this.helper(materialsToFilter, recipe)
        )

        // Craftable preset filter:
        if (this.props.filterPresets.craftable.value) {
            Object.keys(materialsToFilter).forEach(nnm => {
                if (!!materialsToFilter[nnm]) {
                    filtered = filtered.filter(recipe => recipe.materials[nnm] <= materialsToFilter[nnm] && Object.keys(materialsToFilter).some(material => Object.keys(recipe.materials).includes(material)))
                }
            })
        }
        return filtered
    }

    componentDidMount() {
        this.setState(prevState => ({
            ...prevState,
            recipes: this.props.recipes
        }));
    }

    render() {
        // Detect if we have Nookipedia data or if we should render a loading screen
        const { recipes, filterBy } = this.props;
        let renderChoice = null

        // If this is the initial render, we shouldn't show anything
        if (!recipes) {
            return (
                <div className="hidden lg:block">
                    <p>Loading data from Nookipedia...</p>
                </div>
            );
        }

        // If we haven't filtered yet, use the complete list of recipes
        else if (Object.keys(filterBy).length === 0) {
            renderChoice = recipes
        }

        // We HAVE filtered, use the subset of the complete list
        else {
            renderChoice = this.filterRecipes(filterBy);
        }
        // ------------- Beyond this point, we have the Nookipedia data -------------------------
        // List of all items to display
        const list_of_items = []

        renderChoice.forEach((recipe) => {
            list_of_items.push(<Item key={recipe.name} itemData={recipe} />); /* eslint-disable-line */
        })

        return (
            <div id="recipes" className="hidden lg:flex">
                <div className="row">
                    {list_of_items}
                </div>
            </div>
        )
    }
}
