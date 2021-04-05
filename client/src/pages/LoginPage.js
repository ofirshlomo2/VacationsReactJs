import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Actions } from '../store';


import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';




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

	return (
		<div className="App">
			<form onChange={onChange} onSubmit={onSubmit}>
				<input type="text" name="userName" />
				<input type="password" name="password" />
				<button>login</button>
			</form>
		</div>

	);
};

export default LoginPage;


