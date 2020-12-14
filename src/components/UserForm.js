import React, {Component} from "react"
import UserDetails from './UserDetails'
import ConfirmationPage from './ConfirmationPage';
import Success from './Success'
import '../pages/MainPage.css';
//import firebase from "firebase";

export class UserForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        email: '',
        education: '',
        experience: '',
        lessonCost: '',
        moreDetails: '',
        picture: ''
    }

    //go to next step
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    }

    //go back to prev step
    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }

    //Handle field change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, gender, phoneNumber, email,
            education, experience, lessonCost, moreDetails, picture} = this.state;
        const values = {firstName, lastName, gender, phoneNumber, email,
            education, experience, lessonCost, moreDetails, picture}

        switch(step){
            case 1:
                return(
                    <UserDetails
                    nextStep ={this.nextStep}
                    handleChange={this.handleChange}
                    values ={values}
                    />
                )
            case 2:
                return(
                    <ConfirmationPage
                        nextStep ={this.nextStep}
                        prevStep ={this.prevStep}
                        values ={values}
                    />
                )
            case 3:
                return(
                    <Success/>
                )
        }
    }
}


export default UserForm



