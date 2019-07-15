import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withWidth from '@material-ui/core/withWidth';
import { withContext } from '../../contextapi';

class Footer extends Component {
	getIndex = () => {
		const { category, muscles } = this.props;
		return category ? muscles.findIndex((val) => val === category) + 1 : 0;
	}
	handleChangeCategory = (ev, index) => {
		const { muscles } = this.props;
		const category = index === 0 ? '' : muscles[index - 1];
		this.props.onSelectCategory(category);
	}
	render() {
		const { muscles, width } = this.props;
		return (
			<AppBar position='static'>
				<Tabs
					centered={width !== 'xs'}
					variant={width === 'xs' ? 'scrollable' : 'standard'}
					value={this.getIndex()}
					onChange={this.handleChangeCategory}
					indicatorColor="secondary"
					textColor="secondary"
				>
					<Tab label="All" />
					{muscles.map((val, i) => <Tab key={i} label={val} />)}
				</Tabs>
			</AppBar>
		);
	}
}

export default withContext(withWidth()(Footer));