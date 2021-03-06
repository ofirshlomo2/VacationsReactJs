import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Actions, Selectors } from '../store';
import { VacationList, VacationModal } from '../components/';
import { ButtonGroup } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function HomePage() {
	const user = useSelector(Selectors.user);
	const isAdmin = user?.role === 1;
	const vacations = useSelector(Selectors.vacations);
	const onOpenModal = () => dispatch(Actions.vacationModal.open());
	const dispatch = useDispatch();
	const history = useHistory();

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
	async function logOutFanction() {
		const res = await fetch('/api/auth/logout');
		history.push('/login');

		dispatch(Actions.user.set(null));
	}

	const classes = useStyles();
	return (
		<div className="Home">
			<div className="header">Hello : {user?.firstName}</div>
			<ButtonGroup color="primary" aria-label="outlined primary button group">
				<Button olor="primary" onClick={logOutFanction}>Log Out</Button>
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
					</div>)}
			</ButtonGroup>

			<VacationList user={user} vacations={vacations} />
			<VacationModal />
		</div>
	);
}

export default HomePage;
