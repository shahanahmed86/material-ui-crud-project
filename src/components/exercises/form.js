import React, { Component } from 'react';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    Button,
    MenuItem,
    DialogContent,
    DialogContentText,
    DialogActions, withWidth
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    smFieldWidth: {
        width: 320
    },
    xsFieldWidth: {
        width: 175
    },
    centerTheBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default withStyles(styles)(withWidth()(class extends Component {
    state = {
        exercise: {
            title: '',
            description: '',
            muscles: ''
        }
    };
    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.exercise !== prevState.exercise) return {
            exercise: nextProps.exercise
        }
        return null;
    }
    render() {
        const { exercise: { title, description, muscles } } = this.state;
        const { classes, categories, editing, handleChange, onSubmitHandler, width } = this.props;
        return (
            <div className={classes.centerTheBox}>
                <DialogContent>
                    <DialogContentText>Please fill out the form below</DialogContentText>
                    <form>
                        <TextField
                            autoFocus
                            label="Title"
                            value={title}
                            onChange={handleChange('title')}
                            margin="normal"
                            className={width === 'xs' ? classes.xsFieldWidth : classes.smFieldWidth}
                        />
                        <br />
                        <FormControl className={width === 'xs' ? classes.xsFieldWidth : classes.smFieldWidth}>
                            <InputLabel htmlFor="muscles">Muscles</InputLabel>
                            <Select
                                value={muscles}
                                onChange={handleChange('muscles')}
                            >
                                {categories.map((val, i) => (
                                    <MenuItem key={i} value={val}>{val}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />
                        <TextField
                            multiline
                            rowsMax="4"
                            label="Description"
                            value={description}
                            onChange={handleChange('description')}
                            margin="normal"
                            className={width === 'xs' ? classes.xsFieldWidth : classes.smFieldWidth}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color="secondary"
                        onClick={onSubmitHandler}
                        disabled={!title || !muscles}
                    >
                        {editing ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </div>
        );
    }
}))