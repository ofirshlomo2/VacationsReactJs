import { useState } from 'react';

import { useHistory } from 'react-router-dom';


const field = ['firstName', 'lastName', 'userName', 'password'];


function RegisterPage() {
	const [form, setForm] = useState({});
	const [serverError, setServerError] = useState('');

	const history = useHistory();

	const onSubmit = async event => {
		try {
			event.preventDefault();
			// todo: validate
			const res = await fetch('/api/regiser', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(form),
			});

			const body = await res.json();
			if (!res.ok) {
				return setServerError(body.message);
			}
			history.push('/login');

		} catch (err) { }
	};
	const onChange = event => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	return (
		<div className="App">
			<form className="registerForm" onChange={onChange} onSubmit={onSubmit}>
				<label htmlFor="firstName">firstName</label>
				<input type="text" name="firstName" />
				<label htmlFor="lastName">lastName</label>
				<input type="text" name="lastName" />
				<label htmlFor="userName">userName</label>
				<input type="text" name="userName" />
				<label htmlFor="password">password</label>
				<input type="password" name="password" />
				<button>regiser</button>
				{!!serverError && <div className="error">{serverError}</div>}
			</form>
		</div>
	);
}

export default RegisterPage;
