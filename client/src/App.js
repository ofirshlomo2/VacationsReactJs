// id firstName lastName userName password role

import { useState } from 'react';

import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginPage, RegisterPage, HomePage } from './pages';
import { Actions, Selectors } from './store';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

function App() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	const history = useHistory();

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
	}, []);

	if (loading) return <div>loading....</div>;

	return (
		<div className="App">
			<main>
				<Switch>
					<Route exact path="/">
						<Auth>
							<HomePage />
						</Auth>
					</Route>
					<Route exact path="/login">
						<LoginPage />
					</Route>
					<Route exact path="/regiser">
						<RegisterPage />
					</Route>
				</Switch>
			</main>
		</div>
	);
}

function Auth({ children }) {
	const user = useSelector(Selectors.user);
	if (!user) return <Redirect to="/login" />;
	return children;
}

export default App;
