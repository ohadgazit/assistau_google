import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import firebase, {User} from "firebase";
import UserDetails from "./UserDetails";
import {List, ListItem} from 'material-ui/List';

export class Success extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <h3>!תודה שנרשמת לאתר</h3>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default Success

