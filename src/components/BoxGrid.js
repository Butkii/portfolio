import React from 'react';
import { FaArrowRight } from 'react-icons/fa';


const BoxGrid = () => {
  const boxes = [
    { 
        title: 'Etch-A-Sketch', 
        text: 'Create digital art with an online Etch A Sketch website. Sketch, shake, and restart for endless creative possibilities. Created using HTML, CSS and JavaScript.',
        link: 'https://github.com/Butkii/etch-a-sketch',
    },
    { 
        title: 'QuickNote', 
        text: 'Effortlessly manage tasks with a notes app. Organize, edit, and access your notes anytime, anywhere. Created using Flutter.',
        link: 'https://github.com/Butkii/Flutter-My-Notes',
    },
    { 
        title: 'MindMemo', 
        text: 'Revolve through projects with cyclic management. Tasks, sub-tasks, and email reminders for organized productivity. Created using React and Nodejs',
        link: 'https://github.com/emmanuelorobinson/MindMemo',
    },
    { 
        title: 'Rock Paper Scissors', 
        text: 'Custom-built rock-paper-scissors game for engaging and quick decision-making fun. Created using HTML, CSS, and JavaScript.',
        link: 'https://github.com/Butkii/rock-paper-scissors'
    },
    { 
        title: 'Magazine Service', 
        text: 'Create, manage magazines using a desktop application. Add articles, supplements, customers, handle payments, and receive emails for a comprehensive magazine service. Created using JavaFX.',
        link: 'https://github.com/Butkii/MagazineService'
    },
    { 
        title: 'Portfolio', 
        text: 'Discover my journey and creations through this portfolio website. Created using React and TailwindCSS',
        link: 'https://github.com/Butkii/portfolio'
    },
  ];

  return (
    <div className="box-grid px-60 mx-10 pt-4">
      {boxes.map((box, index) => (
        <div key={index} className="box">
          <div className="box-title">{box.title}</div>
          <div className="box-text">{box.text}</div>
          <a href={box.link} target="_blank" rel="noopener noreferrer" className="box-button">
            <FaArrowRight />
          </a>
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
