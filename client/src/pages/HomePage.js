import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
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
	const history = useHistory()

	useEffect(() => {
		async function getVacations() {
			const res = await fetch('/api/vacations');
			const body = await res.json();
			dispatch(Actions.vacations.set(body));
		}
		getVacations();
	}, []);

	const useStyles = makeStyles(theme => ({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	}));



	function logOutFanction() {
		Storage.cookies.clear("token");
		history.push("/login");
		//const cookiesToken = Window.cookies;
		//cookiesToken.remove('token', { domain: "localhost", path: "/" })
		/*
		const cookiesToken = Window.cookies;
		cookiesToken.remove('token');
		window.location.href = 'http://localhost:3000/';
		*/
	}

	const classes = useStyles();
	return (
		<div className="Home">
			<div className="header">Hello : {user?.firstName}</div>
			<div>
				<Button variant="contained" color="primary" onClick={logOutFanction}>
					Log Out
					</Button>
			</div>
			{isAdmin && (
				<div>
					<Button variant="contained" color="secondary" onClick={onOpenModal}>
						Add Vacation
					</Button>
					<Link to="/reports">
						<Button variant="contained" color="primary">
							Reports
						</Button>
					</Link>

				</div>
			)}

			<VacationList user={user} vacations={vacations} />
			<VacationModal />
		</div>
	);
}

export default HomePage;
