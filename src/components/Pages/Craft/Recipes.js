import React, { Component } from 'react'
import Item from './Item'
import './Recipes.css'
// import local_recipes from './temp_recipes.json' 

// const local_testing = true;

export default class Recipes extends Component {
    filterRecipes(materials) {
        return this.props.recipes.filter(
            recipe => recipe.materials.map(material => ({name: material.name.toLowerCase(), count: material.count})).filter(
                material => materials.includes(material.name)
            ).length === materials.length
        )
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
                <div className="col col-md-8">
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
            renderChoice = this.filterRecipes(Object.keys(filterBy));
        }
        // ------------- Beyond this point, we have the Nookipedia data -------------------------
        // List of all items to display
        const list_of_items = []

        renderChoice.forEach((recipe) => {
            list_of_items.push(<Item key={recipe.name} itemData={recipe} />); /* eslint-disable-line */
        })

        return (
            <div id="recipes" className="col col-md-8 self-contained">
                <div className="row">
                    {list_of_items}
                </div>
            </div>
        )
    }
}
