import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';






const useStylesSelect = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 60,
        color: "white",
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: "white",
        direction: "ltr",
    },

    title: {
        flexGrow: 1,
    },
}));

//export default function ButtonAppBar() {
const ButtonAppBar = (props) =>{
    const classes = useStyles();
    const classesSelect = useStylesSelect();


    const [age, setAge] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
        props.data.changeGender(event.target.value)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };




    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>



                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChange}
                            defaultValue={"מין"}
                        >
                            <MenuItem value={0}>
                                <em>מין</em>
                            </MenuItem>
                            <MenuItem value={1}>נקבה</MenuItem>
                            <MenuItem value={2}>זכר</MenuItem>
                        </Select>




                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar;