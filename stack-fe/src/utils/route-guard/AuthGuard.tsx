import { useNavigate } from "react-router-dom";

// project imports
import useAuth from "hooks/useAuth";

import React, { ReactElement, useEffect } from "react";

// ==============================|| AUTH GUARD ||============================== //

interface GuardProps {}
const AuthGuard: React.FC<React.PropsWithChildren<GuardProps>> = ({ children }) => {
	const { isLoggedIn, user } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/", { replace: true });
		}
	}, [isLoggedIn, navigate, user]);

	return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
