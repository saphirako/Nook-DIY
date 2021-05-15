import React from 'react'
import { Link } from 'react-router-dom'

import "./Header.css"

export class Header extends React.Component {
    render() {
        return (
            <div className="nookdiy-header">
                <img src="https://www.centerforempathy.org/wp-content/uploads/2019/11/placeholder.png" alt="NookDIY typeface logo" />
                <ul className="navbar">
                    <li><h3><Link to="/">craft</Link></h3></li>
                    <li><h3><Link to="/plan">plan</Link></h3></li>
                    <li><h3><Link to="/about">about</Link></h3></li>
                </ul>
            </div>
        )
    }
}

export default Header
