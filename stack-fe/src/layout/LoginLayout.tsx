import React from "react";
import { Outlet } from "react-router-dom";

// material-ui

const LoginLayout = () => {
	return (
		<React.Fragment>
			<Outlet />
		</React.Fragment>
	);
};

export default LoginLayout;
