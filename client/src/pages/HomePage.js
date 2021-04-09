import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Actions, Selectors } from '../store';
import { Vacation, VacationList, VacationModal } from '../components/';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function HomePage() {
	const user = useSelector(Selectors.user);
	const isAdmin = user?.role === 1;
	const vacations = useSelector(Selectors.vacations);
	const onOpenModal = () => dispatch(Actions.vacationModal.open());
	const dispatch = useDispatch();



	useEffect(() => {
		async function getVacations() {
			const res = await fetch('/api/vacations');
			const body = await res.json();
			dispatch(Actions.vacations.set(body));
		}
		getVacations();
	}, []);

	const useStyles = makeStyles((theme) => ({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	}));

	const classes = useStyles();
	return (
		<div className="Home">
			<div className="header">Hello : {user?.firstName}</div>
			{isAdmin && (
				<div>
					<Button variant="contained" color="secondary" onClick={onOpenModal}>
						Add Vacation
      </Button>
				</div>
			)}
			<VacationList user={user} vacations={vacations} />
			<VacationModal />
		</div>
	);
}

export default HomePage;
