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
        marginRight: "-moz-initial"
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

    bar:{
        backgroundColor: "antiquewhite",
    }

}));

//export default function ButtonAppBar() {
const ButtonAppBar = (props) =>{
    const classes = useStyles();
    const classesSelect = useStylesSelect();


    const [gender, setGender] = React.useState(0);
    const [openGender, setOpenGender] = React.useState(false);

    const handleChangeGender = (event) => {
        setGender(event.target.value);
        props.dataGender.changeGender(event.target.value)
    };

    const handleCloseGender = () => {
        setOpenGender(false);
    };

    const handleOpenGender = () => {
        setOpenGender(true);
    };

    const [age, setAge] = React.useState(0);
    const [openAge,setOpenAge] = React.useState(false);

    const handleChangeAge= (event) =>{
        setAge(event.target.value);
        props.dataAge.changeAgeSorting(event.target.value)
    };

    const handleCloseAge = () =>{
        setOpenAge(false);
    };

    const handleOpenAge = () => {
        setOpenAge(true);
    };




    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.bar}>
                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>*/}



                        <Select className={classesSelect.formControl}
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openGender}
                            onClose={handleCloseGender}
                            onOpen={handleOpenGender}
                            value={gender}
                            onChange={handleChangeGender}
                            defaultValue={"מין"}
                        >
                            <MenuItem value={0}>
                                <em>מין</em>
                            </MenuItem>
                            <MenuItem value={1}>נקבה</MenuItem>
                            <MenuItem value={2}>זכר</MenuItem>
                        </Select>
                    <Select className={classesSelect.formControl}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openAge}
                        onClose={handleCloseAge}
                        onOpen={handleOpenAge}
                        value={age}
                        onChange={handleChangeAge}
                        defaultValue={"מין"}
                    >
                        <MenuItem value={0}>
                            <em>מיין על פי גיל </em>
                        </MenuItem>
                        <MenuItem value={1}>גיל: סדרה עולה</MenuItem>
                        <MenuItem value={2}>גיל: סדר יורד</MenuItem>
                    </Select>




                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar;