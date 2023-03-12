import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from 'components/Header'
import Craft from 'components/Pages/Craft'
import Item from 'components/Pages/Item'
import About from 'components/Pages/About'
import { Item as ItemType } from 'components/Item'

import card_colors from 'data/colors.json'
import local_recipes from 'data/temp_recipes.json' // Dummy data to test locally without hitting Nookipedia API
import { useState } from 'react'
import { Ingredient, MaterialName, NookipediaRecipe, Recipe } from 'components/Recipe'
import { Color } from 'components/Colors'
import Footer from 'components/Footer'

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

export default function App() {
    // const [nookipediaDataRetrieved, setNookipediaDataRetrieved] = useState(false)
    const [recipes, setRecipes] = useState<Array<Recipe>>([])

    useEffect(() => {
        if (isLocalTest) {
            console.log('simulating request to Nookipedia API for recipes')
            setRecipes({ ...cleanseAPIAndAddLocalData(local_recipes) })
        } else {
            console.log('making request to Nookipedia API for recipes')
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

    return (
        <div className="font-semibold text-brown-600 w-full h-screen max-w-screen-hd flex flex-col justify-between mx-auto">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Craft recipes={recipes} />} />
                    <Route path="item" element={<Item />} />
                    {/* <Route exact path="/plan" render={props => ()} /> */}
                    <Route path="about" element={<About />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}
