import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className = "flex items-center justify-between p-8 font-body">
            <ul className="flex space-x-16 justify-center flex-grow text-light-primary text-lg font-semibold">
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
            <button className="bg-light-secondary text-light-background text-lg px-4 py-1 rounded-lg font-semibold">Contact</button>
        </nav>
    )
};

export default Header;