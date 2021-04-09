import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Actions } from '../store';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './login.css';




function LoginPage() {

	const [form, setForm] = useState({});

	// hook get store.dispatch method
	const dispatch = useDispatch();
	const history = useHistory();





	const onSubmit = async event => {
		event.preventDefault();
		const res = await fetch('/api/login', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(form),
		});
		if (!res.ok) {
			//handle error
			return;
		}
		const body = await res.json();
		console.log(body);
		dispatch(Actions.user.set(body));
		history.push('/');
	};

	const onChange = event => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	function handleRegister() {
		history.push('/register');
	}



	const useStyles = makeStyles((theme) => ({
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
	return (
		<div className="login">
			<Container component="main" maxWidth="xs" >
				<Typography component="h1" variant="h5">
					Log In
		  </Typography>
				<form className={classes.form} onChange={onChange} onSubmit={onSubmit}>
					<TextField
						name="userName"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="userName"
						label="user name"
						autoFocus
					/>
					<TextField
						name="password"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						log In
			</Button>
					<Link onClick={handleRegister} variant="body2">
						{"Don't have an account? Sign Up"}
					</Link>
				</form>

				<Box mt={8}>
				</Box>
			</Container>
		</div>
	);

};

export default LoginPage;


