import React from 'react'
import { Link } from 'react-router-dom'
import { defaultTransitionTime } from 'utils'
import { ReactComponent as NookDIYLogo } from 'static/image/NookDIY.svg'


export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileNavbarIsOpen: false
        }
    }

    toggleMobileMenu() {
        this.setState(prevState => ({
            mobileNavbarIsOpen: !prevState.mobileNavbarIsOpen
        }));
    }

    triggerPageTransition(delay, event) {
        // Always close the navdrawert after interaction
        this.setState(prevState => ({ ...prevState, mobileNavbarIsOpen: false }))

        // Cue that sweet, sweet transition
        this.props.transition(delay, event)
    }

    render() {
        var mobileMenuSandwich = "M4 6h16M4 12h16M4 18h16"
        var mobileMenuClose = "M6 18L18 6M6 6l12 12"
        return (
            <div className="flex flex-row mx-auto max-w-screen-2xl">
                <NookDIYLogo className={"absolute w-2/5 left-10 lg:left-24 hd:left-56 top-5 lg:top-0 lg:w-1/5 " + ((!this.state.mobileNavbarIsOpen || window.innerWidth > 1024) ? "visible" : "invisible")} alt="NookDIY typeface logo" />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-10 top-8 h-10 w-10 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={this.toggleMobileMenu.bind(this)}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={this.state.mobileNavbarIsOpen ? mobileMenuClose : mobileMenuSandwich} />
                </svg>
                <nav className={"font-bold text-2xl text-brown-700 w-full h-screen text-center justify-center flex-col justify-items-end lg:h-auto lg:justify-end lg:flex-row " + ((this.state.mobileNavbarIsOpen || window.innerWidth >= 1024) ? "flex" : "hidden")}>
                    <Link
                        className="py-16 w-screen lg:w-2/12 "
                        onClick={(event) => this.triggerPageTransition(100, event)}
                        to="/">craft</Link>
                    <Link
                        className="py-16 w-screen lg:w-2/12 "
                        onClick={(event) => this.triggerPageTransition(defaultTransitionTime, event)}
                        to="/about">about</Link>
                    {/* <Link className="py-16 w-screen lg:w-2/12 " onClick={() => this.setState(prevState => ({ ...prevState, mobileNavbarIsOpen: false}))} to="/plan">plan</Link> */}
                </nav>
            </div>
        )
    }
}

export default Header
