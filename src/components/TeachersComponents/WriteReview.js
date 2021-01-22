import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "../../Shared/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import firebase from "firebase";

import DialogTitle from '@material-ui/core/DialogTitle';
import {useAuthState} from "react-firebase-hooks/auth";


const WriteReview = (props) => {
    console.log('from write review')
    const [open, setOpen] = React.useState(true); //review test
    const [value1, setValue] = React.useState({id: 0, name: ""});
    const [text,setText] = React.useState('');
    const [score, setScore] = React.useState(2);
    const auth = firebase.auth();
    const [user] = useAuthState(auth);

    //Reviews test
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        writeUserData();
        setOpen(false);

    };

    function writeUserData() {
        const email = auth.currentUser.email
        const db = firebase.firestore()
        const teacherRef = db.collection('teachers').doc('4')
        console.log(props.teacherName)
        console.log(teacherRef)
        console.log(text)
        const pushit = {
            email,
            text_review : text,
            score: score
        }
        teacherRef.update({
            reviews: firebase.firestore.FieldValue.arrayUnion(pushit)
        });
    }

    return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> דרג את המורה {props.teacherName}</DialogTitle>
    <DialogContent>
        <DialogContentText>
            הזן ביקורת עבור המורה - במה הוא עזר לך,מה הוא לימד וכו׳. הגבלה של 144 תוים
        </DialogContentText>
        <TextField
            rtl
            required={true}
            autoFocus
            margin="dense"
            id="name"
            label="כתוב את הביקורת כאן"
            rowsMax={4}
            type="text"
            fullWidth
            onChange={(event) => {
                setText(event.target.value);
            }}
        />
        <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">דרג</Typography>
            <Rating
                name="simple-controlled"
                value={score}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    </DialogContent>

    <DialogActions>
        <Button onClick={handleClose} color="primary">
            שלח ביקורת
        </Button>
        <Button onClick={handleClose} color="primary">
            בטל
        </Button>
    </DialogActions>
    </Dialog>

    );
};

export default WriteReview;