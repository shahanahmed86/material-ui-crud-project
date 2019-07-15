import React, { Component } from 'react';
import { Header, Footer } from './components/layout';
import Exercises from './components/exercises';
import { muscles, exercises } from './components/store';
import { Provider } from './contextapi';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class extends Component {
	state = {
		exercises,
		exercise: {
			title: '',
			description: '',
			muscles: ''
		}
	};
	getExercises = () => {
		const initialExercises = muscles.reduce(
			(exercises, category) => ({
				...exercises,
				[category]: []
			}),
			{}
		);
		return Object.entries(
			this.state.exercises.reduce((acc, cur) => {
				const { muscles } = cur;
				acc[muscles] = [ ...acc[muscles], cur ];
				return acc;
			}, initialExercises)
		);
	};
	handleCategorySelect = (category) => {
		this.setState({ category });
	};
	handleExercisesSelect = (id) => {
		this.setState(({ exercises }) => ({
			editing: false,
			exercise: exercises.find((val) => val.id === id)
		}));
	};
	onCreateHandler = (exercise) => {
		this.setState(({ exercises }) => ({
			exercises: [ ...exercises, exercise ]
		}));
	};
	handleExercisesDelete = (id) => {
		this.setState(({ exercises, exercise, editing }) => ({
			exercises: exercises.filter((ex) => ex.id !== id),
			exercise: exercise.id === id ? {} : exercise,
			editing: exercise.id === id ? false : editing
		}));
	};
	onSelectEditHandler = (id) => {
		this.setState(({ exercises }) => ({
			editing: true,
			exercise: exercises.find((ex) => ex.id === id)
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
	onUpdateHandler = () => {
		this.setState(({ exercises, exercise }) => ({
			exercises: [ ...exercises.filter((ex) => ex.id !== exercise.id), exercise ],
			editing: false
		}));
	};
	getContext = () => ({
		...this.state,
		muscles,
		exercisesByMuscles: this.getExercises(),
		onSelectCategory: this.handleCategorySelect,
		onSelectExercise: this.handleExercisesSelect,
		onCreate: this.onCreateHandler,
		onEdit: this.onSelectEditHandler,
		onDelete: this.handleExercisesDelete,
		handleChange: this.handleChange,
		onUpdateHandler: this.onUpdateHandler
	});
	render() {
		return (
			<Provider value={this.getContext()}>
				<CssBaseline />
				<Header />
				<Exercises />
				<Footer />
			</Provider>
		);
	}
}
