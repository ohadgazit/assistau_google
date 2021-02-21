import './App.css';
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import React from "react";
import TeachersList from "./pages/TeachersList";
import TeacherItemExpanded from "./pages/TeacherPage";
import MainNavigation from "./navigation/MainNavigation";

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import TeacherRegistration from "./components/Registration/TeacherRegistration";
import UpdateDetails from "./components/Registration/UpdateDetails";


const App = () => {


    return (

        <Router>
            <MainNavigation/>
            <main>
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Route path="/SignIn" component={SignInPage} exact  >
                </Route>
                <Route path="/UserForm" exact>
                    <TeacherRegistration/>
                </Route>

                <Route path="/updateUserForm" >
                    <UpdateDetails />
                </Route>
                <Route path="/courses/:courseId/" exact>
                    <TeachersList />
                </Route>

                <Route path="/register" >
                    <TeacherRegistration />
                </Route>
                <Route path="/teachers/:teacherId" exact>
                    <TeacherItemExpanded />
                </Route>

                <Redirect to="/"/>
            </Switch>
            </main>
        </Router>

    );


}

export default App;

