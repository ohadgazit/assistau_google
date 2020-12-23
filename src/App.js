import './App.css';
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import React from "react";
import TeachersList from "./pages/TeachersList";
import TeacherItemExpanded from "./pages/TeacherPage";
import MainNavigation from "./navigation/MainNavigation";
import UserForm from "./components/UserForm";
import UpdateDetailsForm from "./components/UpdateDetailsComponents/UpdateDetailsForm";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

const App = () => {


    return (

        <Router>
            <MainNavigation/>
            <main>
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Route path="/SignIn" exact>
                    <SignInPage/>
                </Route>
                <Route path="/UserForm" exact>
                    <UserForm/>
                </Route>
                <Route path="/updateUserForm" exact>
                    <UpdateDetailsForm />
                </Route>
                <Route path="/courses/:courseId/" exact>
                    <TeachersList />
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

