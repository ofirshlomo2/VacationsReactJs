import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { format } from 'date-fns';

// modal
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { Actions, Selectors } from '../..//store';

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
		if ((['startDate', 'endDate'].includes(key))) {
			form_data.append(key, format(new Date(object[key]), 'yyyy-MM-dd'));
		} else {
			form_data.append(key, object[key]);
		}
	}

	return form_data;
}

const VacationModal = () => {
	const dispatch = useDispatch();

	const vacationModal = useSelector(Selectors.vacationModal);

	const [image, setImage] = useState(null);

	const form = vacationModal.form;
	const isEdit = vacationModal.isEdit;

	const onCloseModal = () => dispatch(Actions.vacationModal.close());

	const onSubmit = async event => {
		event.preventDefault();
		console.log('form', form, image);

		if (isEdit) {
			const res = await fetch(`/api/vacations/${form.id}`, {
				method: 'PUT',
				body: getFormData({ ...form, image }),
			});
			const body = await res.json();
			dispatch(Actions.vacations.update(body));
		} else {
			const res = await fetch('/api/vacations', {
				method: 'POST',
				body: getFormData({ ...form, image }),
			});
			const body = await res.json();

			dispatch(Actions.vacations.add(body));
		}

		onCloseModal();
	};
	const onChange = event => {
		const { name, value, files, type } = event.target;

		let val = type === 'file' ? files[0] : value;
		console.log(name, val);
		if (type === 'file') return setImage(val);
		dispatch(Actions.vacationModal.onChange({ name, value: val }));
	};

	return (
		<Modal open={vacationModal.isOpen} onClose={onCloseModal} center>
			<h2>{isEdit ? 'Edit' : 'Add'} Vacation</h2>
			<form onSubmit={onSubmit}>
				{fields.map(field => {
					const { name, type = 'text' } = field;

					const value = type === 'date' ? form[name] && format(new Date(form[name]), 'yyyy-MM-dd') : form[name];
					return (
						<div key={name}>
							<label htmlFor={name}>{name}</label>
							<input
								onChange={onChange}
								defaultValue={type !== 'file' ? value : undefined}
								type={type}
								name={name}
							/>
						</div>
					);
				})}
				<button>{isEdit ? 'Save' : 'Add'}</button>
			</form>
		</Modal>
	);
};

export default VacationModal;
