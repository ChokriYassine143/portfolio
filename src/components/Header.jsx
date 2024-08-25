// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
