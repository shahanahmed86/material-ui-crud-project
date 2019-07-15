import React, { Component, Fragment } from 'react';
import { Dialog, DialogTitle, Fab, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Draggable from 'react-draggable';
import FormData from '../form';
import { withContext } from '../../../contextapi';

function PaperComponent(props) {
	return (
		<Draggable cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

class CreateDialog extends Component {
	state = {
		open: false,
		exercise: {
			title: '',
			description: '',
			muscles: ''
		}
	};
	handleToggle = () => {
		this.setState(({ open }) => ({
			open: !open
		}));
	};
	handleChange = (name) => ({ target: { value } }) => {
		this.setState(({ exercise }) => ({
			exercise: {
				...exercise,
				[name]: value
			}
		}));
	};
	onSubmitHandler = () => {
		const { exercise } = this.state;
		this.props.onCreate({
			...exercise,
			id: exercise.title.toLocaleLowerCase().replace(/ /g, '-')
		});
		this.setState(({ exercise }) => ({
			open: false,
			exercise: {
				...exercise,
				title: '',
				description: '',
				muscles: ''
			}
		}));
	};
	render() {
		const { open, exercise } = this.state,
			{ muscles } = this.props;
		return (
			<Fragment>
				<Fab variant="round" color="secondary" size="small" onClick={this.handleToggle}>
					<Add />
				</Fab>
				<Dialog
					open={open}
					onClose={this.handleToggle}
					aria-labelledby="draggable-dialog-title"
					PaperComponent={PaperComponent}
				>
					<DialogTitle style={{ cursor: 'move' }} id="form-dialog-title">
						Create a New Exercise
					</DialogTitle>
					<FormData
						exercise={exercise}
						handleChange={this.handleChange}
						categories={muscles}
						onSubmitHandler={this.onSubmitHandler}
						editing={false}
					/>
				</Dialog>
			</Fragment>
		);
	}
}

export default withContext(CreateDialog);
