import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from 'components/Header/Header'
import CraftPage from 'components/Pages/Craft/CraftPage'
import './App.css'
import card_colors from 'data/colors.json' 

const NOOKIPEDIA_TOKEN = process.env.REACT_APP_NOOKIPEDIA_TOKEN;

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
		console.log("making request to Nookipedia API for recipes")
		// fetch(
		// 	"https://api.nookipedia.com/nh/recipes",
		// 	{
		// 		method: "GET",
		// 		headers: {
		// 			"X-API-KEY": NOOKIPEDIA_TOKEN,
		// 			"Accept-Version": "1.0.0"
		// 		},
		// 		redirect: 'follow',
		// 	}
		// )
		// .then(response => response.json())
		// .then(recipesFromAPI => this.cleanseAPIAndAddLocalData(recipesFromAPI))
		// .then (ourCompleteRecipes => this.setState(prevState => ({
		// 	...prevState,
		// 	recipes: ourCompleteRecipes,
		// 	nookipediaDataRetrieved: true
		// })))
	}

	render() {
		return (
			<div className="container">
				<Router>
					<Header />
					<Route exact path="/" render={props => (
						// <CraftPage recipes={this.state.recipes} nookipediaDataRetrieved={this.state.nookipediaDataRetrieved}/>
						<></>
					)} />
					<Route exact path="/plan" render={props => (
						// <>
						// 	<p>You're on the PLAN page.</p>
						// 	{/* This is where the PLAN page will be rendered */}
						// </>
						<></>
					)} />
					<Route exact path="/about" render={props => (
						<>
							{/* <p>You're on the ABOUT page.</p> */}
							{/* This is where the ABOUT page will be rendered */}
						</>
					)} />
					{/* <h5 className="footer align-center">a project by <a href="https://www.saphirako.com">saphirako</a></h5> */}
				</Router>
			</div>
		)
	}
}