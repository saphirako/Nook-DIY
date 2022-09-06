import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as NookDIYLogo } from 'static/image/NookDIY.svg'

const mobileMenuSandwich = 'M4 6h16M4 12h16M4 18h16'
const mobileMenuClose = 'M6 18L18 6M6 6l12 12'

export default function Header() {
    const [mobileNavbarIsOpen, setMobilebavbarIsOpen] = useState(false)

    const toggleMobileMenu = () => setMobilebavbarIsOpen(!mobileNavbarIsOpen)

    return (
        <div className="flex flex-row mx-auto max-w-screen-2xl">
            <NookDIYLogo
                className={
                    'absolute w-2/5 left-10 lg:left-24 hd:left-56 top-5 lg:top-0 lg:w-1/5 ' +
                    (!mobileNavbarIsOpen || window.innerWidth > 1024 ? 'visible' : 'invisible')
                }
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-10 top-9 h-10 w-10 text-brown-700 lg:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => toggleMobileMenu}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={mobileNavbarIsOpen ? mobileMenuClose : mobileMenuSandwich}
                />
            </svg>
            <nav
                className={
                    'font-bold text-2xl text-brown-700 w-full h-screen text-center justify-center flex-col justify-items-end lg:h-auto lg:justify-end lg:flex-row ' +
                    (mobileNavbarIsOpen || window.innerWidth >= 1024 ? 'flex' : 'hidden')
                }
            >
                <Link
                    className="py-16 w-screen lg:w-2/12  transition transform scale-90 hover:scale-100"
                    to="/"
                >
                    craft
                </Link>
                <Link
                    className="py-16 w-screen lg:w-2/12 transition transform scale-90 hover:scale-100"
                    to="/about"
                >
                    about
                </Link>
                {/* <Link className="py-16 w-screen lg:w-2/12 " onClick={() => this.setState(prevState => ({ ...prevState, mobileNavbarIsOpen: false}))} to="/plan">plan</Link> */}
            </nav>
        </div>
    )
}
