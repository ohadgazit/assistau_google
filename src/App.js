import './App.css';
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import React from "react";
import TeachersList from "./pages/TeachersList";
import TeacherItemExpanded from "./pages/TeacherPage";
import MainNavigation from "./navigation/MainNavigation";
import UserForm from "./components/UserForm";
//import ReviewCard from "./components/ReviewCard";
import UpdateDetailsForm from "./components/UpdateDetailsComponents/UpdateDetailsForm";
import Register from './components/Registration/Register'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
//import Register2 from "./components/Registration/Register2";
import Register3 from "./components/Registration/Register3";
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
                <Route path="/SignIn" exact>
                    <SignInPage/>
                </Route>
                {/*<Route path="/UserForm" exact>*/}
                {/*    <UserForm/>*/}
                {/*</Route>*/}
                <Route path="/UserForm" exact>
                    <Register3/>
                </Route>
                {/*<Route path="/updateUserForm" exact>*/}
                {/*    <UpdateDetailsForm />*/}
                {/*</Route>*/}
                <Route path="/updateUserForm" exact>
                    <UpdateDetails />
                </Route>
                <Route path="/courses/:courseId/" exact>
                    <TeachersList />
                </Route>
                <Route path="/register" exact>
                    <Register3 />
                </Route>
                <Route path="/teachers/:teacherId" exact>
                    <TeacherItemExpanded />
                </Route>
                <Route path="/register" exact>
                    <Register />
                </Route>
                <Redirect to="/"/>
            </Switch>
            </main>
        </Router>

    );


}

export default App;

