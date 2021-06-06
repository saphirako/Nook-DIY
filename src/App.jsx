import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from 'components/Header'
import Craft from 'components/Pages/Craft'
import About from 'components/Pages/About'
import Item from 'components/Pages/Item';

import './App.css'
import card_colors from 'data/colors.json'
import local_recipes from 'data/temp_recipes.json' // Dummy data to test locally without hitting Nookipedia API

const NOOKIPEDIA_TOKEN = process.env.REACT_APP_NOOKIPEDIA_TOKEN;
const isLocalTest = (process.env.REACT_APP_USE_LOCAL_DATA === 'true');

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nookipediaDataRetrieved: false,
			recipes: null,
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
				recipe.materials.map(material => (recipe_materials[material.name.toLowerCase()] = material.count))
				cleanedData.push({
					...recipe,
					materials: recipe_materials
				})
				alreadySeen[recipe.name] = true
			}
		})
		return cleanedData
	}

	componentDidMount() {
		if (isLocalTest) {
			console.log("simulating request to Nookipedia API for recipes")
			this.setState(prevState => ({
				...prevState,
				recipes: this.cleanseAPIAndAddLocalData(local_recipes),
				nookipediaDataRetrieved: true
			}))
		}
		else {
			console.log("making request to Nookipedia API for recipes")
			fetch(
				"https://api.nookipedia.com/nh/recipes",
				{
					method: "GET",
					headers: {
						"X-API-KEY": NOOKIPEDIA_TOKEN,
						"Accept-Version": "1.0.0"
					},
					redirect: 'follow',
				}
			)
				.then(response => response.json())
				.then(recipesFromAPI => this.cleanseAPIAndAddLocalData(recipesFromAPI))
				.then(ourCompleteRecipes => this.setState(prevState => ({
					...prevState,
					recipes: ourCompleteRecipes,
					nookipediaDataRetrieved: true
				})))
		}
	}

	render() {
		return (
			<div className="font-semibold text-brown-600 w-full h-screen">
				<Router>
					<Header />
					<Route exact path="/" render={props => (
						<Craft
							recipes={this.state.recipes}
							nookipediaDataRetrieved={this.state.nookipediaDataRetrieved}
						/>
					)} />
					<Route exact path="/item" component={Item}/>
					{/* <Route exact path="/plan" render={props => ()} /> */}
					<Route exact path="/about" component={About} />
				</Router>
			</div>
		)
	}
}