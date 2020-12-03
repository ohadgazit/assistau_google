import './App.css';
import MainPage from "./pages/MainPage";
import FirstC from './components/FirstC.js';
import React from "react";
import TeachersList from "./pages/TeachersList";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Route path="/first_c" exact>
                    <FirstC/>
                </Route>
                <Route path="/teachers" exact>
                    <TeachersList />
                </Route>
                <Redirect to="/"/>
            </Switch>
        </Router>

    );


}

export default App;

