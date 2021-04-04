import { configureStore, createSlice } from '@reduxjs/toolkit';

import userSlice from './user';
import vacationsSlice from './vacations';

export const Actions = {
	user: userSlice.actions,
	vacations: vacationsSlice.actions,
};

export const Selectors = {
	user: state => state.user?.data,
	vacations: state => state.vacations?.data,
};

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		vacations: vacationsSlice.reducer,
	},
});

export { store };
