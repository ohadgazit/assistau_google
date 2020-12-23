import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database'
import 'firebase/auth';

export class ConfirmationPage extends Component {
    continue = e => {
        e.preventDefault();
        //Process form - send to DB//
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };


    render() {
        const {values: {firstName, lastName, gender, phoneNumber, email, education, experience, lessonCost, courseList, moreDetails}} = this.props;


        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <h3>נא אשר את הפרטים</h3>
                    <List>
                        <ListItem
                            primaryText="שם פרטי"
                            secondaryText={firstName}
                        />
                        <ListItem
                            primaryText="שם משפחה"
                            secondaryText={lastName}
                        />
                        <ListItem
                            primaryText="מגדר"
                            secondaryText={gender}
                        />
                        <ListItem
                            primaryText="מספר טלפון"
                            secondaryText={phoneNumber}
                        />
                        <ListItem
                            primaryText="מייל"
                            secondaryText={email}
                        />
                        <ListItem
                            primaryText="השכלה"
                            secondaryText={education}
                        />
                        <ListItem
                            primaryText="נסיון"
                            secondaryText={experience}
                        />
                        <ListItem
                            primaryText="עלות שיעור"
                            secondaryText={lessonCost}
                        />
                        <ListItem
                            primaryText="רשימת קורסים"
                            secondaryText={courseList}
                        />
                        <ListItem
                            primaryText="פרטים נוספים"
                            secondaryText={moreDetails}
                        />
                    </List>
                    <br/>
                    <RaisedButton
                        label="אשר והמשך"
                        primary={true} //blue color
                        style={styles.button}
                        //onClick={this.continue}
                        onClick={this.continue}

                    />
                    <RaisedButton
                        label="חזרה"
                        primary={false} //blue color
                        style={styles.button}
                        onClick={this.back}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        )


        function writeUserData(){
            const auth = firebase.auth();
            const userId = auth.currentUser.uid
            const email = auth.currentUser.email
            const imageUrl = auth.currentUser.photoURL
            firebase.database().ref('users/' + userId).set({
                first_name: {values:firstName},
                last_name: {values:lastName},
                gender: {values:gender},
                phoneNumber: {values:phoneNumber},
                email: {values:email},
                education: {values:education},
                lessonCost: {values:lessonCost},
                moreDetails: {values:moreDetails},
                imageUrl: {imageUrl},
                timestamp : new Date().getTime()
            });

        }






    }
}



const styles = {
    button: {
        margin: 15
    }

}

export default ConfirmationPage