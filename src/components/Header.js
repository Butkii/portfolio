import React from 'react';

function Header() {
    return (
        <nav className = "flex items-center justify-between p-8 font-body">
            <ul className="flex space-x-16 justify-center flex-grow text-light-primary text-lg font-semibold">
                <li>
                    <a href = "#home">Home</a>
                </li>
                <li>
                    <a href = "#about">About</a>
                </li>
                <li>
                    <a href = "#projects">Projects</a>
                </li>
            </ul>
            <button className="bg-light-secondary text-light-background text-lg px-4 py-1 rounded-lg font-semibold">Contact</button>
        </nav>
    )
};

export default Header;