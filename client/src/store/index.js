import { configureStore, createSlice } from '@reduxjs/toolkit';

import userSlice from './user';
import vacationsSlice from './vacations';
import vacationModalSlice from './vacationModal';

export const Actions = {
	user: userSlice.actions,
	vacations: vacationsSlice.actions,
	vacationModal: vacationModalSlice.actions,
};

export const Selectors = {
	user: state => state.user?.data,
	vacations: state => state.vacations?.data,
	vacationModal: state => state.vacationModal,
};

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		vacations: vacationsSlice.reducer,
		vacationModal: vacationModalSlice.reducer,
	},
});

export { store };
