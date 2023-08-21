import React from 'react';


const BoxGrid = () => {
  const boxes = [
    { text: 'Box 1', icon: '🌟' },
    { text: 'Box 2', icon: '🚀' },
    { text: 'Box 3', icon: '🎉' },
    { text: 'Box 4', icon: '🌈' },
    { text: 'Box 5', icon: '🔥' },
    { text: 'Box 6', icon: '⭐' },
  ];

  return (
    <div className="box-grid">
      {boxes.map((box, index) => (
        <div key={index} className="box">
          <div className="box-icon">{box.icon}</div>
          <div className="box-text">{box.text}</div>
          <button className="box-button">Button</button>
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
