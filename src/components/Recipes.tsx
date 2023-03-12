import { useContext } from 'react'
import { FilterPresetType } from './filters'
import ItemCard from './ItemCard'
import { MaterialName, Recipe } from './Recipe'
import { RecipeContext } from './Contexts/RecipeContext'

interface RecipesProps {
    filterBy: Partial<Record<MaterialName, number | null>>
    filterPresets: FilterPresetType
}

const includesMaterialFilter = (
    filterMaterials: Partial<Record<MaterialName, number | null>>,
    recipe: Recipe
) => {
    let tmp = Object.keys(recipe.materials).filter((material) =>
        Object.keys(filterMaterials).includes(material)
    )
    return tmp.length >= Object.keys(filterMaterials).length && tmp.length > 0
}

export default function Recipes(props: RecipesProps) {
    const { recipes } = useContext(RecipeContext);
    // Detect if we have Nookipedia data or if we should render a loading screen
    const { filterBy, filterPresets } = props

    const filterRecipes = (materialsToFilter: Partial<Record<MaterialName, number | null>>) => {
        // Get recipes that have the provided materials in them at all
        let filtered = recipes.filter((recipe: Recipe) =>
            includesMaterialFilter(materialsToFilter, recipe)
        )

        // Craftable preset filter:
        if (filterPresets.craftable.value) {
            Object.keys(materialsToFilter).forEach((mtfMaterialName: MaterialName) => {
                if (typeof mtfMaterialName !== 'undefined') {
                    filtered = filtered.filter(
                        (recipe) =>
                            recipe.materials[mtfMaterialName] <=
                                materialsToFilter[mtfMaterialName] &&
                            Object.keys(materialsToFilter).some((material) =>
                                Object.keys(recipe.materials).includes(material)
                            )
                    )
                }
            })
        }
        return filtered
    }

    // If we haven't filtered yet, use the complete list of recipes, otherwise use the subset of the complete list
    let renderChoice: Array<Recipe> =
        Object.keys(filterBy).length === 0 ? recipes : filterRecipes(filterBy)

    return recipes.length ? (
        <div
            id="recipes"
            className="w-full px-20 relative place-items-center justify-around inline-flex flex-wrap basis-full gap-16"
        >
            {renderChoice.map((recipe) => (
                <ItemCard key={recipe.name} itemData={recipe} isShowing={true} />
            ))}
        </div>
    ) : (
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
