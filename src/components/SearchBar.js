import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import teachers  from '../mocks/teachers'

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
}));

export default function ControlledOpenSelect() {
    const classes = useStyles();
    const [course, setCourse] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [chosenTeachers, setTeacher] = React.useState([]);

    const handleChange = (event) => {
        setCourse(event.target.value);
    };
    
    const handleTeacher = (chosenTeacher) => {
        setTeacher(chosenTeacher);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const sumbitForm = () => {
        let chosenTeachers = teachers.filter((teacher) => {
            return teacher.classes.includes(Number(course))
        })
        handleTeacher(chosenTeachers)
    }
    
    const menuItems = [
        {id: 1, name: 'Class 1' },
        {id: 2, name: 'Class 2' },
        {id: 3, name: 'Class 3' },
        {id: 4, name: 'Class 4' },
        {id: 5, name: 'Class 5' },
        {id: 6, name: 'Class 6' },
        {id: 7, name: 'Class 7' },
        {id: 8, name: 'Class 8' },
        {id: 9, name: 'Class 9' },
    ];

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Select Course</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={course}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                    menuItems.map(({ id, name }) => (
                        <MenuItem key={id} value={id}>
                            {name}
                        </MenuItem>
                    ))
                    }
                </Select>
                <Button color="primary" variant="contained" onClick={sumbitForm}>
                    Search
                </Button>

            </FormControl>

            {
                chosenTeachers.length ?
                chosenTeachers.map(({ name, pic}, idx) => (
                    <div key={idx}>
                        <h3>{name} </h3>
                        <Avatar alt={name} src={pic} className={classes.large}  />
                    </div>
                )
                ) : <p>לא נמצא מורה</p>
            }
        </div>
    );
}
