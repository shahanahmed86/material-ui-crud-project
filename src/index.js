import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: red,
		secondary: {
			main: amber.A400,
			light: amber[200],
			dark: amber[700]
		},
		type: 'dark'
	}
});

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<App />
	</MuiThemeProvider>,
	document.querySelector('#root')
);
