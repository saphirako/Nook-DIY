import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from 'components/Header'
import Craft from 'components/Pages/Craft'
import About from 'components/Pages/About'
import Item from 'components/Pages/Item'

import card_colors from 'data/colors.json'
import local_recipes from 'data/temp_recipes.json' // Dummy data to test locally without hitting Nookipedia API
import { defaultTransitionTime } from 'utils'

const NOOKIPEDIA_TOKEN = process.env.REACT_APP_NOOKIPEDIA_TOKEN
const isLocalTest = process.env.REACT_APP_USE_LOCAL_DATA === 'true'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nookipediaDataRetrieved: false,
            recipes: null,
            pageIsShowing: true,
        }
    }

    // Add in color data to recipes
    cleanseAPIAndAddLocalData(recipes) {
        let cleanedData = []
        let alreadySeen = {}
        let recipe_materials = {}

        recipes.forEach((recipe) => {
            recipe.card_color = card_colors[recipe.name.toLowerCase()]
            if (!alreadySeen[recipe.name]) {
                recipe_materials = {}
                recipe.materials.map(
                    (material) =>
                        (recipe_materials[material.name.toLowerCase()] =
                            material.count)
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

    componentDidMount() {
        if (isLocalTest) {
            console.log('simulating request to Nookipedia API for recipes')
            this.setState((prevState) => ({
                ...prevState,
                recipes: this.cleanseAPIAndAddLocalData(local_recipes),
                nookipediaDataRetrieved: true,
            }))
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
                .then((recipesFromAPI) =>
                    this.cleanseAPIAndAddLocalData(recipesFromAPI)
                )
                .then((ourCompleteRecipes) =>
                    this.setState((prevState) => ({
                        ...prevState,
                        recipes: ourCompleteRecipes,
                        nookipediaDataRetrieved: true,
                    }))
                )
        }
    }

    cueTransition(delay, event) {
        let targetURL = null

        if (event) {
            event.preventDefault()
            targetURL = event.currentTarget.href
        }

        if (targetURL === document.URL) return

        // Cause the transition
        this.setState((prevState) => ({
            ...prevState,
            pageIsShowing: false,
        }))

        // This is so the exit animation has time to show
        setTimeout(
            () => {
                this.setState(
                    (prevState) => ({
                        ...prevState,
                        pageIsShowing: true,
                    }),
                    () => {
                        if (targetURL) {
                            window.location.href = targetURL
                        }
                    }
                )
            },
            delay === undefined ? defaultTransitionTime : delay
        )
    }

    render() {
        return (
            <div className="font-semibold text-brown-600 w-full h-screen">
                <Router>
                    <Header transition={this.cueTransition.bind(this)} />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Craft
                                    recipes={this.state.recipes}
                                    nookipediaDataRetrieved={
                                        this.state.nookipediaDataRetrieved
                                    }
                                    isShowing={this.state.pageIsShowing}
                                    transition={this.cueTransition.bind(this)}
                                />
                            }
                        />
                        <Route path="item" element={<Item />} />
                        {/* <Route exact path="/plan" render={props => ()} /> */}
                        <Route
                            path="about"
                            element={
                                <About isShowing={this.state.pageIsShowing} />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        )
    }
}
