import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from 'components/Header/Header'
import CraftPage from 'components/Pages/Craft/CraftPage'
import './App.css'

const NOOKIPEDIA_TOKEN = process.env.REACT_APP_NOOKIPEDIA_TOKEN;

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nookipediaDataRetrieved: false,
			recipes: null,
		}
	}

	componentDidMount() {
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
		.then(recipes => this.setState(prevState => ({
			...prevState,
			recipes: recipes,
			nookipediaDataRetrieved: true
		})))
	}

	render() {
		return (
			<div className="container container-large">
				<Router>
					<Header />
					<Route exact path="/" render={props => (
						<CraftPage recipes={this.state.recipes} nookipediaDataRetrieved={this.state.nookipediaDataRetrieved}/>
					)} />
					<Route exact path="/plan" render={props => (
						<>
							<p>You're on the PLAN page.</p>
							{/* This is where the PLAN page will be rendered */}
						</>
					)} />
					<Route exact path="/about" render={props => (
						<>
							<p>You're on the ABOUT page.</p>
							{/* This is where the ABOUT page will be rendered */}
						</>
					)} />
					<h5 className="footer align-center">a project by <a href="https://www.saphirako.com">saphirako</a></h5>
				</Router>
			</div>
		)
	}
}

// Define the Material themes of the application
// const nookdiy_theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#734F3D"
//     },
//     secondary: {
//       main: "#734F3D"
//     }
//   },
//   background: {
//     paper: "#f9f0e7"
//   }
// })