// third-party
import React, { createContext } from "react";
import { useSelector } from "store";
import { IUser } from "types";
// reducer - state management
// project imports
// constant
interface InitialLoginContextProps {
	isLoggedIn: boolean;
	isInitialized?: boolean;
	user: any;
}
const initialState: InitialLoginContextProps = {
	isLoggedIn: false,
	isInitialized: false,
	user: null
};
type JWTContextType = {
	isLoggedIn: boolean;
	logout: (id: string) => void;
	login: (email: string, password: string) => Promise<void>;
	user?: IUser | null;
};
// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);
interface JWTProviderProps {}
const JWTProvider: React.FC<React.PropsWithChildren<JWTProviderProps>> = ({ children }) => {
	const { isLoggedIn } = useSelector((state) => state.account);
	const login = async (email: string, password: string) => {};

	const logout = async (id: string) => {};

	return (
		<JWTContext.Provider value={{ isLoggedIn, login, logout }}>{children}</JWTContext.Provider>
	);
};
export { JWTProvider };
export default JWTContext;
