import React from 'react';
import Navbar from './Navbar';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>Tan's Personal Webpage</h1>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
