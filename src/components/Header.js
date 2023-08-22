import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className = "flex items-center justify-between px-14 py-8 font-body">
            <ul className="flex space-x-16 justify-center flex-grow text-light-primary text-lg font-semibold pl-20">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
            </ul>
            <Link to="/contact">
                <button className="bg-light-secondary text-light-background text-lg px-4 py-1 rounded-lg font-semibold">Contact</button>
            </Link>
        </nav>
    )
};

export default Header;