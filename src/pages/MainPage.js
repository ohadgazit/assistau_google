import logo from './logo.png';
import './MainPage.css';
import React from "react";
import ControllableStates from '../components/CourseSearch/Searchbar'
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

function MainPage() {





    const [openHelp, setOpenHelp] = React.useState(false);

    const handleClickOpenHelp = () => {
        setOpenHelp(true);
    };

    const handleCloseHelp = () => {
        setOpenHelp(false);

    };

    const [openContact,setOpenContact] = React.useState(false);

    const handleClickOpenContact = () =>{
        setOpenContact(true);
    }

    const handleCloseContact = () =>{
        setOpenContact(false);
    }

    const useStyles = makeStyles((theme) => ({


        appBar: {
            top: 'auto',
            bottom: 0,
            height: 45,
            color: "white",
            backgroundColor: "gray",
            display: "flex",
            justifyContent: "space-around"


        },
        grow: {
            flexGrow: 1,
        },
        button: {
            margin: theme.spacing(1),
            direction: "ltr",
            color: "white",
        },


    }));

    const classes = useStyles();
    return (
                <div className="MainPage">
                    <header className="MainPage-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        {/*<p>*/}
                        {/*    Team 6 - AssisTAU*/}
                        {/*</p>*/}
                        <p>
                            בחר קורס על מנת למצוא מורה המלמד קורס זה
                        </p>
                        <ControllableStates/>
                    </header>

                    <Dialog open={openHelp} onClose={handleCloseHelp} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title"> הסבר על האתר </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                כאן צריך לכתוב מידע עלינו ועל האתר
                            </DialogContentText>

                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">מידעמידע</Typography>

                            </Box>
                        </DialogContent>

                    </Dialog>
                    <Dialog open={openContact} onClose={handleCloseContact} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title"> אתר זה נבנה במסגרת סדנת פיתוח בטכנולוגיות גוגל </DialogTitle>
                        <DialogContent>
                            <DialogContentText>

                               מפתחי האתר:
                                עדי פישר
                                {"\n"}
                                דודי אורן
                                אהד גזית

                            </DialogContentText>

                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">למידע ניתן לפנות במייל ohadgt@gmail.com</Typography>

                            </Box>
                        </DialogContent>

                    </Dialog>
                    <AppBar flexGrow={1} className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="open drawer">
                                <div >כל הזכויות שמורות</div>
                            </IconButton>

                            <div className={classes.grow} />


                            <Button

                                onClick={handleClickOpenContact}
                                className={classes.button}
                                endIcon={<EmailOutlinedIcon edge="end" color="inherit"  />}
                            >
                                אודותינו
                            </Button>

                            <Button

                                onClick={handleClickOpenHelp}
                                className={classes.button}
                                endIcon={<ContactSupportOutlinedIcon edge="end" color="inherit"  />}
                            >
                                עזרה
                            </Button>

                        </Toolbar>
                    </AppBar>
                </div>




    );


}

export default MainPage;
