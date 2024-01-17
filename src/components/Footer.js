import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useMode } from '../ModeContext';
   import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
    const { mode, toggleMode } = useMode();
    const navItems = [
        {
            name: 'Github',
            icon: <FaGithub size={20} />,
            link: "https://github.com/Butkii",
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin size={20} />,
            link: "https://www.linkedin.com/in/bhakti-ghaghda/",
        },
    ]

    return (
        <nav className={`px-4 py-4 md:px-14 md:py-8 font-body z-1000 ${mode === 'light' ? 'bg-light-background' : 'bg-dark-background'}`}>
            <div className="hidden md:flex items-center justify-between">
                <ul className={`flex space-x-4 justify-center flex-grow ${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'} text-lg font-semibold`}>
                    {navItems.map((item) => {
                        return <li>
                            <Link to={item.link} className='transition-transform ease-in-out delay-100 hover:translate-y-10 hover:underline-offset-2'>
                                {item.icon}
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
            <div className={` pt-2 pl-2 font-mono ${mode === 'light' ? 'text-light-secondary' : 'text-dark-secondary'} text-center`}>
                Bhakti Ghaghda.
            </div>
        </nav>
    );
}

export default Header;
