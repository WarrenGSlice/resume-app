
import React, { useState, useContext } from 'react';
import ChatBox from './Components/ChatBox';
import ResumeBox from './Components/ResumeBox';
import { NavbarContext } from './NavbarContext';

import './Resume.css';

const Resume = () => {
    const { isNavbarOpen } = useContext(NavbarContext);
    const [resumeUrl, setResumeUrl] = useState(null);

  const handleResumeUpload = (url) => {
    setResumeUrl(url); // Update the resume URL in state
  };

  return (
    <div className={`resume-page ${isNavbarOpen ? 'navbar-open' : 'navbar-closed'}`}>
      <ChatBox onResumeUpload={handleResumeUpload} />
      <ResumeBox resumeUrl={resumeUrl} />
    </div>
  );
};

export default Resume;