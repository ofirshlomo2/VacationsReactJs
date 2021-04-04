import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Actions, Selectors } from '../store';

import { Vacation, VacationList } from '../components/';

// modal
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const fields = [
	{
		name: 'description',
	},
	{
		name: 'destination',
	},
	{
		name: 'price',
		type: 'number',
	},
	{
		name: 'startDate',
		type: 'date',
	},
	{
		name: 'endDate',
		type: 'date',
	},
	{
		name: 'image',
		type: 'file',
	},
];

function getFormData(object) {
	const form_data = new FormData();

	for (const key in object) {
		console.log('ss', key, object[key]);
		form_data.append(key, object[key]);
	}

	return form_data;
}

function HomePage() {
	const user = useSelector(Selectors.user);
	const isAdmin = user?.role === 1;
	const vacations = useSelector(Selectors.vacations);

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({});

	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);

	const onSubmit = async event => {
		event.preventDefault();
		console.log('form', form);

		const res = await fetch('/api/vacations', {
			method: 'POST',
			body: getFormData(form),
		});

		const body = await res.json();
		dispatch(Actions.vacations.add(body));

		onCloseModal();
	};
	const onChange = event => {
		const { name, value, files, type } = event.target;

		let val = type === 'file' ? files[0] : value;
		console.log(name, val);
		setForm({ ...form, [name]: val });
	};

	useEffect(() => {
		async function getVacations() {
			const res = await fetch('/api/vacations');
			const body = await res.json();
			dispatch(Actions.vacations.set(body));
		}
		getVacations();
	}, []);

	return (
		<div className="Home">
			<div className="header">Hello : {user?.firstName}</div>
			{isAdmin && (
				<div>
					<button onClick={onOpenModal}>Add Vacation</button>
				</div>
			)}
			<VacationList user={user} vacations={vacations} />

			<Modal open={open} onClose={onCloseModal} center>
				<h2>Add Vacation</h2>
				<form onChange={onChange} onSubmit={onSubmit}>
					{fields.map(field => {
						const { name, type = 'text' } = field;
						return (
							<div>
								<label htmlFor={name}>{name}</label>
								<input type={type} name={name} />
							</div>
						);
					})}
					<button>Add</button>
				</form>
			</Modal>
		</div>
	);
}

export default HomePage;
