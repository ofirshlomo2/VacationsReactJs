import { createSlice } from '@reduxjs/toolkit';

const vacationModalSlice = createSlice({
	name: 'vacationModal',
	initialState: {
		isOpen: false,
		form: {},
		isEdit: false,
	},
	reducers: {
		open: (state, action) => {
			state.isOpen = true;
			state.form = action.payload?.vacation || {};
			state.isEdit = action.payload?.isEdit;
		},
		onChange: (state, action) => {
			const { name, value } = action.payload;

			state.form[name] = value;
		},
		close: state => {
			state.isOpen = false;
		},
	},
});

export default vacationModalSlice;
