import React from 'react'
import { Link } from 'react-router-dom'

import "./Header.css"

export class Header extends React.Component {
    render() {
        var path = "M4 6h16M4 12h16M4 18h16"
        var close= "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        return (
            <div className>
                <img className="absolute w-2/5 ml-10 mt-10 lg:w-1/5" src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png" alt="NookDIY typeface logo" />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-10 top-10 h-12 w-12 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={path} />
                </svg>
                <nav className="font-bold w-full h-screen justify-center flex flex-col lg:hidden">
                    <Link className="p-14 mx-auto" to="/">craft</Link>
                    <Link className="p-14 mx-auto" to="/plan">plan</Link>
                    <Link className="p-14 mx-auto" to="/about">about</Link>
                </nav>
            </div>
        )
    }
}

export default Header
