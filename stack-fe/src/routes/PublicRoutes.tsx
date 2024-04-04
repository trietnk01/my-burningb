// project imports

import HomePage from "views/public/HomePage";

// ==============================|| AUTH ROUTING ||============================== //

const PublicRoutes = {
	path: "/",
	children: [
		{
			path: "/",
			element: <HomePage />
		}
	]
};
export default PublicRoutes;
