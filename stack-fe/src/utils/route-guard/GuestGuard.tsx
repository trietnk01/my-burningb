import { useNavigate } from "react-router-dom";

// project imports
import useAuth from "hooks/useAuth";
import React, { ReactElement, useEffect } from "react";

interface GuardProps {}
const GuestGuard: React.FC<React.PropsWithChildren<GuardProps>> = ({ children }) => {
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/admin/dashboard", { replace: true });
		}
	}, [isLoggedIn, navigate]);

	return <React.Fragment>{children}</React.Fragment>;
};

export default GuestGuard;
