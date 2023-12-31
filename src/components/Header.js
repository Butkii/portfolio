import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useMode } from '../ModeContext';
   

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { mode, toggleMode } = useMode();
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="px-4 py-3 md:px-14 md:py-8 font-body z-1000">
            <div className="hidden md:flex items-center justify-between">
                <button onClick={toggleMode}>
                    {mode === 'dark' ? <FaToggleOn size={30} color="white"/> : <FaToggleOff size={30}/>}
                </button>
                <ul className={`flex space-x-16 justify-center flex-grow ${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'} text-lg font-semibold pl-20`}>
                    <li>
                        <Link to="/" onClick={closeMenu}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={closeMenu}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects" onClick={closeMenu}>
                            Projects
                        </Link>
                    </li>
                </ul>
                <Link to="/contact">
                    <button className={`${mode === 'light' ? 'bg-light-secondary text-light-background' : 'bg-dark-secondary text-dark-background'}  text-lg px-4 py-1 rounded-lg font-semibold`}>
                        Contact
                    </button>
                </Link>
            </div>

            {/* Mobile View */}
            <div className="md:hidden mt-4 ml-2 z-1000">
                <button
                    className={`${mode === 'light' ? 'text-light-secondary' : 'text-dark-secondary'} text-lg p-2`}
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <div
                    className={`md:hidden fixed top-0 right-0 ${mode === 'light' ? 'bg-light-accent' : 'bg-dark-accent'} bg-opacity-80 w-64 h-screen transform transition-transform duration-300 ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <ul className="flex flex-col space-y-4 mt-24 ml-6">
                        <li>
                            <button onClick={toggleMode}>
                                {mode === 'dark' ? <FaToggleOn size={30} color="white"/> : <FaToggleOff size={30}/>}
                            </button>
                        </li>
                        <li>
                            <Link to="/" className={`${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'} text-xl font-semibold`} onClick={closeMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={`${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'} text-xl font-semibold`} onClick={closeMenu}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className={`${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'} text-xl font-semibold`} onClick={closeMenu}>
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={`${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'} text-xl font-semibold`} onClick={closeMenu}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
