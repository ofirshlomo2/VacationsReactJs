import { Vacation } from './';
import { useDispatch } from 'react-redux';
import { Actions } from '../../store';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';






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
			const res = await fetch(`/api/vacations/follow/${vacationId}`, {
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
					? [<DeleteIcon onClick={() => deleteVacation(vacation.id)}>
					</DeleteIcon>,
					<EditIcon color="secondary" onClick={() => dispatch(Actions.vacationModal.open({ vacation, isEdit: true }))}> </EditIcon>
					]
					: [
						<span color="secondary" onClick={() => toggleFollow(vacation.id)}>{isFollow ? <FavoriteIcon color="secondary" /> : <FavoriteIcon color="primary" /> }</span>
					];
				return <Vacation key={vacation.id} vacation={vacation} actions={actions} />;
			})}
		</div>
	);
}

export default VacationList;
