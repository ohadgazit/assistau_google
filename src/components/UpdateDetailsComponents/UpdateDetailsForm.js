import React, {Component} from "react"
//import '../pages/MainPage.css';
import UpdateUserDetails from "./UpdateUserDetails";
import ConfirmationPageForUpdate from "./ConfirmationPageForUpdate";
import SuccessUpdate from "./SuccessUpdate";

export class UpdateDetailsForm extends Component {
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
        courseList: '',
        moreDetails: '',
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
            education, experience, lessonCost, courseList, moreDetails} = this.state;
        const values = {firstName, lastName, gender, phoneNumber, email,
            education, experience, lessonCost, courseList, moreDetails}

        switch(step){
            case 1:
                return(
                    <UpdateUserDetails
                        nextStep ={this.nextStep}
                        handleChange={this.handleChange}
                        values ={values}
                    />
                )
            case 2:
                return(
                    <ConfirmationPageForUpdate
                        nextStep ={this.nextStep}
                        prevStep ={this.prevStep}
                        values ={values}
                    />
                )
            case 3:
                return(
                    <SuccessUpdate/>
                )
        }
    }
}

export default UpdateDetailsForm



