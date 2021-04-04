import { createSlice } from '@reduxjs/toolkit';

const vacationsSlice = createSlice({
	name: 'vacations',
	initialState: {
		data: [],
	},
	reducers: {
		set: (state, action) => {
			state.data = action.payload;
		},
		add: (state, action) => {
			state.data.push(action.payload);
		},
		delete: (state, action) => {
			state.data = state.data.filter(v => v.id !== action.payload);
		},
		toggleFollow: (state, action) => {
			const vacation = state.data.find(v => v.id === action.payload);
			vacation.isFollow = !vacation.isFollow;
		},
	},
});

export default vacationsSlice;
