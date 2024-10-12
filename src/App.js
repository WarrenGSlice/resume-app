import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { NavbarProvider } from './NavbarContext';
import Navbar from "./Components/Navbar";
import Resume from "./Resume";

const App = () => {
  return (
    <BrowserRouter>
    <NavbarProvider>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Resume />}/>
      </Routes>
    </NavbarProvider>
    
    </BrowserRouter>
  );
};

export default App;
