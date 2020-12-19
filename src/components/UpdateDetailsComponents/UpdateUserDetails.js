import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from "firebase";

const auth = firebase.auth();
const userId = auth.currentUser.uid
//const email = auth.currentUser.email
//const imageUrl = auth.currentUser.photoURL
const a = firebase.database().ref('users/' + userId).get.first_name;


export class UpdateUserDetails extends Component{
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render(){
        const { values, handleChange } = this.props;
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <TextField
                        hintText="עדכן את שמך הפרטי"
                        //floatingLabelText="שם פרטי"
                        floatingLabelText={a}
                        onChange={handleChange('firstName')}
                        defaultValue={values.firstName}
                    />
                    <br/>
                    <TextField
                        hintText="עדכן את שם המשפחה שלך"
                        floatingLabelText="שם משפחה"
                        onChange={handleChange('lastName')}
                        defaultValue={values.lastName}
                    />
                    <br/>
                    <TextField
                        hintText="עדכן את המגדר שלך"
                        floatingLabelText="מגדר"
                        onChange={handleChange('gender')}
                        defaultValue={values.gender}
                    />
                    <br/>
                    <TextField
                        hintText="עדכן את מספר הטלפון שלך"
                        floatingLabelText="מספר טלפון"
                        onChange={handleChange('phoneNumber')}
                        defaultValue={values.phoneNumber}
                    />
                    <br/>
                    <TextField
                        hintText="עדכן את כתובת המייל שלך"
                        floatingLabelText="מייל"
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                    />
                    <br/>
                    <TextField
                        hintText="עדכן את השכלתך"
                        floatingLabelText="השכלה"
                        onChange={handleChange('education')}
                        defaultValue={values.education}
                    />
                    <br/>
                    <TextField
                        hintText="עדכן את מספר שנות הנסיון שלך"
                        floatingLabelText="נסיון"
                        onChange={handleChange('experience')}
                        defaultValue={values.experience}
                    />
                    <br/>
                    <TextField
                        hintText="עדכן עלות שיעור"
                        floatingLabelText="עלות שיעור"
                        onChange={handleChange('lessonCost')}
                        defaultValue={values.lessonCost}
                    />
                    <br/>
                    <TextField
                        hintText="עדכן את רשימת הקורסים שאתה מלמד"
                        floatingLabelText="רשימת קורסים מופרדים על ידי פסיק"
                        onChange={handleChange('courseList')}
                        defaultValue={values.courseList}
                    />
                    <br/>
                    <TextField
                        hintText="עדכן תיאור או פרטים נוספים"
                        floatingLabelText="פרטים נוספים"
                        onChange={handleChange('moreDetails')}
                        defaultValue={values.moreDetails}
                    />
                    <br/>
                    <RaisedButton
                        label="המשך"
                        primary={true} //blue color
                        style={styles.button}
                        onClick={this.continue}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15
    },
}
export default UpdateUserDetails