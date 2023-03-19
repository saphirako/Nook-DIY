import { Ingredient, MaterialName, NookipediaRecipe, Recipe } from 'components/Recipe'
import { createContext, useEffect, useMemo, useState } from 'react'
import { Item, Item as ItemType } from 'components/Item'
import card_colors from 'data/colors.json'
import { Color } from 'components/Colors'
import local_recipes from 'data/temp_recipes.json' // Dummy data to test locally without hitting Nookipedia API

const NOOKIPEDIA_TOKEN = process.env.REACT_APP_NOOKIPEDIA_TOKEN
const isLocalTest = process.env.REACT_APP_USE_LOCAL_DATA === 'true'
const cardColorMap = card_colors as Record<Recipe['name'], Color>

// Add in color data to recipes
const cleanseAPIAndAddLocalData = (recipes: Array<ItemType>) => {
    let cleanedData: Recipe[] = []
    let alreadySeen: Record<Recipe['name'], boolean> = {}
    let recipe_materials: Partial<Record<MaterialName, number>> = {}

    recipes.forEach((recipe: NookipediaRecipe & ItemType) => {
        recipe.card_color = cardColorMap[recipe.name]
        if (!alreadySeen[recipe.name]) {
            recipe_materials = {}
            recipe.materials.map(
                (material: Ingredient) => (recipe_materials[material.name] = material.count)
            )
            cleanedData.push({
                ...recipe,
                materials: recipe_materials,
            })
            alreadySeen[recipe.name] = true
        }
    })
    return cleanedData
}

type RecipeContextType = {
    recipes: Recipe[]
    selectedRecipe: Item & Recipe
    selectRecipe: (item: Item & Recipe) => void
}
export const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export const RecipeContextProvider = ({ children }: any) => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [selectedRecipe, setSelectedRecipe] = useState<Item & Recipe>(null)

    const contextObject = useMemo(
        () => ({
            recipes,
            selectedRecipe,
            selectRecipe: (item: typeof selectedRecipe) => setSelectedRecipe(item),
        }),
        [recipes, selectedRecipe]
    )

    useEffect(() => {
        if (isLocalTest) {
            console.log('simulating request to Nookipedia API for recipes')
            setRecipes({ ...cleanseAPIAndAddLocalData(local_recipes) })
        } else {
            fetch('https://api.nookipedia.com/nh/recipes', {
                method: 'GET',
                headers: {
                    'X-API-KEY': NOOKIPEDIA_TOKEN,
                    'Accept-Version': '1.0.0',
                },
                redirect: 'follow',
            })
                .then((response) => response.json())
                .then((recipesFromAPI) => cleanseAPIAndAddLocalData(recipesFromAPI))
                .then((ourCompleteRecipes) => setRecipes(ourCompleteRecipes))
        }
    }, [])
    return <RecipeContext.Provider value={contextObject}>{children}</RecipeContext.Provider>
}
