import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from 'components/Header'
import Craft from 'components/Pages/Craft'
import Item from 'components/Pages/Item'
import About from 'components/Pages/About'
import Footer from 'components/Footer'
import { RecipeContextProvider } from 'components/Contexts/RecipeContext'

export default function App() {
    return (
        <div className="font-semibold text-brown-600 w-full h-screen max-w-screen-hd flex flex-col justify-between mx-auto">
            <Router>
                <Header />
                <RecipeContextProvider>
                    <Routes>
                        <Route path="/" element={<Craft />} />
                        <Route path="item" element={<Item />} />
                        {/* <Route exact path="/plan" render={props => ()} /> */}
                        <Route path="about" element={<About />} />
                    </Routes>
                </RecipeContextProvider>
                <Footer />
            </Router>
        </div>
    )
}
