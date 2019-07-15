import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CreateDialog from '../exercises/dialog/create';

const styles = () => ({
	flex: {
		flex: 1
	}
})

export default withStyles(styles)(({ classes }) => (
	<AppBar position="static">
		<Toolbar>
			<Typography variant="h6" color="inherit" className={classes.flex}>
				Exercise Database
			</Typography>
      		<CreateDialog />
		</Toolbar>
	</AppBar>
));
