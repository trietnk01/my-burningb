// material-ui
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<React.Fragment>
			<Outlet />
		</React.Fragment>
	);
};

export default MainLayout;
