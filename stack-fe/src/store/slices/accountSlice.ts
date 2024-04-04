import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "types";
interface IProps {
	isLoggedIn: boolean;
	user: IUser | null;
}
const initialState: IProps = {
	isLoggedIn: false,
	user: null
};
const slice = createSlice({
	name: "account-slice",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.isLoggedIn = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		}
	}
});
export default slice.reducer;
export const { login, logout } = slice.actions;
