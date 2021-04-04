import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		data: null,
	},
	reducers: {
		set: (state, action) => {
			state.data = action.payload;
		},
	},
});

export default userSlice;
