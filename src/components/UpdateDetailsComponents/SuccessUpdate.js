import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class SuccessUpdate extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <h3>!פרטייך עודכנו בהצלחה</h3>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default SuccessUpdate

