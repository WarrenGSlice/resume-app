
import React, { useState, useContext } from 'react';
import ChatBox from './Components/ChatBox';
import ResumeBox from './Components/ResumeBox';
import { NavbarContext } from './NavbarContext';

import './Resume.css';

const Resume = () => {
    const { isNavbarOpen } = useContext(NavbarContext);

  return (
    <div className={`resume-page ${isNavbarOpen ? 'navbar-open' : 'navbar-closed'}`}>
      <ChatBox />
      <ResumeBox />
    </div>
  );
};

export default Resume;