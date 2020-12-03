import logo from './logo.svg';
import './MainPage.css';
import SearchBar from "../components/SearchBar";
import React from "react";


function MainPage() {
    return (
                <div className="MainPage">
                    <header className="MainPage-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Team 6 - AssisTAU
                        </p>
                        <SearchBar/>
                    </header>
                </div>

    );


}

export default MainPage;
