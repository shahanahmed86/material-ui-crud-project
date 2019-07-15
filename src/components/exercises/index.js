import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import FormData from './form';
import '../../App.css';
import { withContext } from '../../contextapi';

const styles = (theme) => ({
	paper: {
		padding: '20px',
		overflowY: 'auto',
		[theme.breakpoints.up('sm')]: {
			margin: '3px 0px',
			height: 'calc(100% - 5px)',
		},
		[theme.breakpoints.down('xs')]: {
			height: '100%',
		}
	},
	'@global': {
		'html, body, #root': {
			height: '100%'
		}
	},
	item: {
		[theme.breakpoints.up('sm')]: {
			height: '100%'
		},
		[theme.breakpoints.down('xs')]: {
			height: '50%'
		}
	},
	wrapper: {
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px - 48px)'
		},
		[theme.breakpoints.down('xs')]: {
			height: 'calc(100% - 56px - 48px)'
		}
	}
});

const Exercise = ({
	classes,
	editing,
	onEdit,
	onDelete,
	exercisesByMuscles,
	category,
	onSelectExercise,
	exercise,
	exercise: { id, title, description },
	muscles,
	handleChange,
	onUpdateHandler
}) => (
	<Grid container className={classes.wrapper}>
		<Grid item xs={12} sm={6} className={classes.item}>
			<Paper className={classes.paper}>
				{exercisesByMuscles.map(
					([ group, exercises ], i) =>
						!category || category === group ? (
							<Fragment key={i}>
								<Typography variant="h5" children={group} />
								<List component="ul">
									{exercises.map(({ id, title }, j) => (
										<ListItem button key={j} onClick={() => onSelectExercise(id)}>
											<ListItemText primary={title} />
											<ListItemSecondaryAction>
												<Grid container spacing={1}>
													<Grid item xs>
														<Fab
															color="primary"
															size="small"
															aria-label="Edit"
															onClick={() => onEdit(id)}
														>
															<Edit />
														</Fab>
													</Grid>
													<Grid item xs>
														<Fab
															color="secondary"
															size="small"
															aria-label="Edit"
															onClick={() => onDelete(id)}
														>
															<Delete />
														</Fab>
													</Grid>
												</Grid>
											</ListItemSecondaryAction>
										</ListItem>
									))}
								</List>
							</Fragment>
						) : null
				)}
			</Paper>
		</Grid>
		<Grid item xs={12} sm={6} className={classes.item}>
			<Paper className={classes.paper}>
				{editing ? (
					<FormData
						key={id}
						exercise={exercise}
						editing={editing}
						handleChange={handleChange}
						categories={muscles}
						onSubmitHandler={onUpdateHandler}
					/>
				) : (
					<Fragment>
						<Typography variant="h4" children={title ? title : 'Welcome'} gutterBottom />
						<Typography
							variant="h6"
							children={title ? description : 'Please select an exercise from the list on the left.'}
						/>
					</Fragment>
				)}
			</Paper>
		</Grid>
	</Grid>
);

export default withContext(withStyles(styles)(Exercise));
