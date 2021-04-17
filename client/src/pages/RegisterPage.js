import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const field = ['firstName', 'lastName', 'userName', 'password'];

function RegisterPage() {
	const [form, setForm] = useState({});
	const [serverError, setServerError] = useState('');
	const history = useHistory();

	const onSubmit = async event => {
		try {
			event.preventDefault();
			// todo: validate
			const res = await fetch('/api/auth/register', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(form),
			});

			const body = await res.json();
			if (!res.ok) {
				return setServerError(body.message);
			}
			history.push('/login');
		} catch (err) {}
	};
	const onChange = event => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const useStyles = makeStyles(theme => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));
	const classes = useStyles();

	function handleLogin() {
		history.push('/login');
	}

	return (
		<Container component="main" maxWidth="xs">
			<Typography component="h1" variant="h5">
				Register
			</Typography>
			<form className={classes.form} onChange={onChange} onSubmit={onSubmit}>
				<TextField
					name="firstName"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="firstName"
					label="first name"
					autoFocus
				/>
				<TextField
					name="lastName"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="Last name"
					type="text"
				/>
				<TextField
					name="userName"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="User Name"
					type="text"
				/>
				<TextField
					name="password"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="password"
					type="password"
					id="password"
				/>
				<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
					Register
				</Button>
				{!!serverError && <div className="error">{serverError}</div>}
				<Link onClick={handleLogin} variant="body2">
					{'Already have an account? Sign In'}
				</Link>
			</form>
			<Box mt={8}></Box>
		</Container>
	);
}

export default RegisterPage;
