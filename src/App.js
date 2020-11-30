import logo from './logo.png';
import './App.css';
import FirstC from './components/FirstC.js';
import SearchBar from './components/SearchBar.js';
import React from "react";
import { Button } from '@material-ui/core';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Team 6  - AssisTAU
        </p>
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
        <SearchBar />
        <div>
        </div>
      </header>
    </div>
  );


}

export default App;

