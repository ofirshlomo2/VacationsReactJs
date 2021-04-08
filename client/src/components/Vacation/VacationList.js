import { Vacation } from './';

import { useDispatch } from 'react-redux';

import { Actions } from '../../store';

function VacationList(props) {
	const { vacations, user } = props;
	const isAdmin = user?.role === 1;

	const dispatch = useDispatch();

	const sortByFollow = (a, b) => {
		if (a.isFollow) return -1;
		return 1;
	};

	const deleteVacation = async vacationId => {
		const res = await fetch(`/api/vacations/${vacationId}`, {
			method: 'DELETE',
		});

		dispatch(Actions.vacations.delete(vacationId));
	};

	const toggleFollow = async vacationId => {
		console.log('toggleFollow', vacationId);

		const isFollow = !!vacations.find(v => v.id === vacationId).isFollow;
		if (isFollow) {
			const res = await fetch('/api/vacations/follow', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					vacationId: vacationId,
				}),
			});
			const body = await res.json();
		} else {
			const res = await fetch('/api/vacations/follow', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					vacationId: vacationId,
				}),
			});
			const body = await res.json();
		}
		dispatch(Actions.vacations.toggleFollow(vacationId));
	};

	return (
		<div className="vacations">
			{[...vacations].sort(sortByFollow).map(vacation => {
				const isFollow = !!vacation.isFollow;

				const actions = isAdmin
					? [
							<span onClick={() => dispatch(Actions.vacationModal.open({ vacation, isEdit: true }))}>edit</span>,
							<span onClick={() => deleteVacation(vacation.id)}>delete</span>,
					  ]
					: [<span onClick={() => toggleFollow(vacation.id)}>{isFollow ? 'UnFollow' : 'Follow'}</span>];
				return <Vacation key={vacation.id} vacation={vacation} actions={actions} />;
			})}
		</div>
	);
}

export default VacationList;
