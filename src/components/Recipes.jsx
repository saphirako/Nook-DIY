import React, { Component } from 'react'
import ItemCard from './ItemCard'

export default class Recipes extends Component {
    helper(filterMaterials, recipe) {
        let tmp = Object.keys(recipe.materials).filter((material) =>
            Object.keys(filterMaterials).includes(material)
        )
        return (
            tmp.length >= Object.keys(filterMaterials).length && tmp.length > 0
        )
    }

    filterRecipes(materialsToFilter) {
        // Get recipes that have the provided materials in them at all
        let filtered = this.props.recipes.filter((recipe) =>
            this.helper(materialsToFilter, recipe)
        )

        // Craftable preset filter:
        if (this.props.filterPresets.craftable.value) {
            Object.keys(materialsToFilter).forEach((nnm) => {
                if (!!materialsToFilter[nnm]) {
                    filtered = filtered.filter(
                        (recipe) =>
                            recipe.materials[nnm] <= materialsToFilter[nnm] &&
                            Object.keys(materialsToFilter).some((material) =>
                                Object.keys(recipe.materials).includes(material)
                            )
                    )
                }
            })
        }
        return filtered
    }

    componentDidMount() {
        this.setState((prevState) => ({
            ...prevState,
            recipes: this.props.recipes,
        }))
    }

    render() {
        // Detect if we have Nookipedia data or if we should render a loading screen
        const { recipes, filterBy } = this.props
        let renderChoice = null

        // If this is the initial render, show the loading screen
        if (!recipes) {
            return (
                <div className="hidden w-3/5 justify-center items-center content-start lg:flex">
                    <svg
                        className="animate-spin rounded-full -ml-1 mr-3 h-6 w-6 text-brown-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox=" 0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.38l3-2.647z"
                        />
                    </svg>
                    <p>Loading data from Nookipedia.</p>
                </div>
            )
        }

        // If we haven't filtered yet, use the complete list of recipes, otherwise use the subset of the complete list
        renderChoice =
            Object.keys(filterBy).length === 0
                ? recipes
                : this.filterRecipes(filterBy)

        // ------------- Beyond this point, we have the Nookipedia data -------------------------
        return (
            <div
                id="recipes"
                className="hidden w-3/5 p-4 auto-rows-recipes place-items-center items-stretch lg:grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
            >
                {renderChoice.map((recipe) => (
                    <ItemCard
                        key={recipe.name}
                        focusMe={this.props.focusItem}
                        itemData={recipe}
                        isShowing={this.props.isShowing}
                        transition={this.props.transition}
                    />
                ))}
            </div>
        )
    }
}
