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
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';





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
        backgroundColor: "grey",
    }

}));

//export default function ButtonAppBar() {
const ButtonAppBar = (props) =>{
    const classes = useStyles();
    const classesSelect = useStylesSelect();


    const [gender, setGender] = React.useState(0);
    const [openGender, setOpenGender] = React.useState(false);

    const [checked, setChecked] = React.useState(true);
    const toggleChecked = () => {
        if (checked === false) {
            setChecked((prev) => !prev);
            props.dataAge.changeLessonCostSorting(0)
            setLessonCose(0)
        }
    };

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

    const [lessonCost, setLessonCose] = React.useState(0);
    const [openCost,setOpenCost] = React.useState(false);

    const handleChangeAge= (event) =>{
        setLessonCose(event.target.value);
        props.dataAge.changeLessonCostSorting(event.target.value)
        if (checked === true) {
            setChecked((prev) => !prev);
        }
    };

    const handleCloseAge = () =>{
        setOpenCost(false);
    };

    const handleOpenAge = () => {
        setOpenCost(true);
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
                                <em>מגדר</em>
                            </MenuItem>
                            <MenuItem value={1}>אישה</MenuItem>
                            <MenuItem value={2}>גבר</MenuItem>
                        </Select>
                    <Select className={classesSelect.formControl}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openCost}
                        onClose={handleCloseAge}
                        onOpen={handleOpenAge}
                        value={lessonCost}
                        onChange={handleChangeAge}
                        defaultValue={"מחיר"}
                    >
                        <MenuItem value={0}>
                            <em>מיין על פי מחיר </em>
                        </MenuItem>
                        <MenuItem value={1}>מחיר: סדר עולה</MenuItem>
                        <MenuItem value={2}>מחיר: סדר יורד</MenuItem>
                    </Select>

                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={checked} onChange={toggleChecked} />}
                            label="מיין על פי דירוג"
                        />
                    </FormGroup>




                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar;