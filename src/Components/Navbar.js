import React, { useState, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { NavbarContext } from '../NavbarContext';


function Navbar() {
    const { isNavbarOpen, toggleNavbar } = useContext(NavbarContext);

    return (
        <div className={`navbar ${isNavbarOpen ? 'open' : 'closed'}`}>

            <ul className="navbar-list">
                <li><Link to="/fill-in">Fill In</Link></li>
                <li><Link to="/new-section">+ New Section</Link></li>
                <li><Link to="/design">Design</Link></li>
                <li><Link to="/ai-toolbox">AI Toolbox</Link></li>
                <li><Link to="/analysis">Analysis</Link></li>
                <li><Link to="/job-interview">Job Interview</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
                <li><Link to="/career-coach">Career Coach</Link></li>
                <li><Link to="/career-map">Career Map</Link></li>
                <li><Link to="/proofreading">Proofreading</Link></li>
                <li><Link to="/download-share">Download & Share</Link></li>
            </ul>

            {/* Arrow for toggling the navbar */}
            <button className={`toggle-button ${isNavbarOpen ? 'open' : 'closed'}`} onClick={toggleNavbar}>
                {isNavbarOpen ? '>' : '<'}
            </button>
        </div>
    );
}

export default Navbar;