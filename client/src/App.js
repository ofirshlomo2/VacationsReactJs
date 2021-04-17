// id firstName lastName userName password role

import { useState } from 'react';

import { Switch, Route, NavLink, useHistory, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginPage, RegisterPage, HomePage, ReportsPage } from './pages';
import { Actions, Selectors } from './store';
import { useDispatch, useSelector } from 'react-redux';

import socketIOClient from 'socket.io-client';

import { useSocket } from './hooks';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(Selectors.user);
	const isAdmin = user?.role === 1;
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	const socket = useSocket();

	useEffect(() => {
		async function getUser() {
			const res = await fetch('/api/auth/current');
			const body = await res.json();
			if (res.ok) {
				// user exists
				dispatch(Actions.user.set(body));
			}
			setLoading(false);
		}
		getUser();
		// coonect to ws
		// const socket = socketIOClient('http://localhost:5000');
	}, []);

	useEffect(() => {
		socket.on('VACATION_EDIT', data => {
			if (!isAdmin) {
				dispatch(Actions.vacations.update(data));
			}
		});
		socket.on('VACATION_DELETE', data => {
			if (!isAdmin) {
				dispatch(Actions.vacations.delete(data.id));
			}
		});
		return () => {
			socket.off('VACATION_EDIT');
			socket.off('VACATION_DELETE');
		};
	}, [user]);

	useEffect(() => {
		async function getVacations() {
			const res = await fetch('/api/vacations');
			const body = await res.json();
			dispatch(Actions.vacations.set(body));
		}
		getVacations();
	}, []);

	if (loading) return <div className="loader">loading....</div>;

	return (
		<div className="App">
			<Header user={user} isAdmin={isAdmin} />
			<main>
				<Switch>
					<Route exact path="/">
						<Auth>
							<HomePage />
						</Auth>
					</Route>
					{isAdmin && (
						<Route exact path="/reports">
							<Auth>
								<ReportsPage />
							</Auth>
						</Route>
					)}
					<Route exact path="/login">
						<LoginPage />
					</Route>
					<Route exact path="/register">
						<RegisterPage />
					</Route>
				</Switch>
			</main>
			<Footer />
		</div>
	);
}

function Auth({ children }) {
	const user = useSelector(Selectors.user);
	if (!user) return <Redirect to="/login" />;
	return children;
}

export default App;
