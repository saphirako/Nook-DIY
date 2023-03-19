import { Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NookDIYLogo } from "static/image/NookDIY.svg";

const navLinkStyling = "transition scale-90 hover:scale-100 duration-150";
interface IMobileNavLink {
    label: string;
    target: string;
}
const MobileNavLink = (props: IMobileNavLink) => {
    return (
        <Transition.Child
            enter="transition duration-300"
            enterFrom="-translate-x-48 scale-75 opacity-0"
            enterTo="translate-x-0 scale-100 opacity-100"
            leave="transition-  duration-200"
            leaveFrom="translate-x-0 scale-100 opacity-100"
            leaveTo="-translate-x-64 scale-75 opacity-0"
            as={Fragment}
        >
            <Link className={navLinkStyling} to={props.target}>
                {props.label}
            </Link>
        </Transition.Child>
    );
};

export default function Header() {
    const [mobileNavbarIsOpen, setMobilebavbarIsOpen] = useState(false);
    const MobileIcon = mobileNavbarIsOpen ? XMarkIcon : Bars3Icon;

    const toggleMobileMenu = () => setMobilebavbarIsOpen(!mobileNavbarIsOpen);

    return (
        <>
            <div className="flex flex-row items-center justify-between p-8 shrink-0">
                <NookDIYLogo className="w-48 lg:w-72 z-20" />
                <MobileIcon
                    className="w-10 text-brown-700 lg:hidden z-20"
                    onClick={toggleMobileMenu}
                />
                <nav className="font-bold text-2xl text-brown-700 text-center hidden lg:block">
                    <div className="flex flex-row gap-64">
                        <Link className={navLinkStyling} to="/">
                            craft
                        </Link>
                        <Link className={navLinkStyling} to="/about">
                            about
                        </Link>
                    </div>
                    {/* <Link className="py-16 w-2/12 " onClick={() => this.setState(prevState => ({ ...prevState, mobileNavbarIsOpen: false}))} to="/plan">plan</Link> */}
                </nav>
            </div>
            <Transition
                show={mobileNavbarIsOpen}
                enterFrom="opacity-0"
                enterTo="opacity-100"
                enter="transition duration-250"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                leave="transition duration-250"
                as="nav"
                className="flex flex-col absolute w-full gap-64 font-bold text-2xl text-brown-700 justify-center text-center lg:hidden bg-brown-300 top-0 bottom-0 overflow-x-hidden z-10"
            >
                <MobileNavLink label="craft" target="/" />
                <MobileNavLink label="about" target="/about" />
                {/* <Link className="py-16 w-2/12 " onClick={() => this.setState(prevState => ({ ...prevState, mobileNavbarIsOpen: false}))} to="/plan">plan</Link> */}
            </Transition>
        </>
    );
}
