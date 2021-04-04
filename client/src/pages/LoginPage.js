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
		<Form onChange={onChange} onSubmit={onSubmit}>
			<Form.Item
				name="userName"
			>
				<Input prefix={<UserOutlined className="site-form-item-icon" />}
					type="text"
					placeholder="Username"
					name="userName" />
			</Form.Item>

			<Form.Item
				name="password"
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					name="password"
					placeholder="Password"
				/>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
		  </Button>

			</Form.Item>
		</Form>
	);
};

export default LoginPage;


