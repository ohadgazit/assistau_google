import logo from './logo.png';
import './MainPage.css';
import React from "react";
import ControllableStates from "../components/CourseSearch/Searchbar"

function MainPage() {
    return (
                <div className="MainPage">
                    <header className="MainPage-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Team 6 - AssisTAU
                        </p>
                        <ControllableStates/>
                    </header>
                </div>

    );


}

export default MainPage;
