import './App.css';
import MainPage from "./pages/MainPage";
import FirstC from './components/FirstC.js';
import React from "react";
import TeachersList from "./pages/TeachersList";
import SearchBar from "./components/SearchBar"
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

const App = () => {


    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Route path="/first_c" exact>
                    <FirstC/>
                </Route>
                <Route path="/courses/:courseId/" exact>
                    <TeachersList />
                </Route>
                <Route path="/teachers2" exact>
                    <SearchBar />
                </Route>
                <Redirect to="/"/>
            </Switch>
        </Router>

    );


}

export default App;

