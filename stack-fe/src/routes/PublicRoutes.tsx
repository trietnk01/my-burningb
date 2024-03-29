import { lazy } from "react";

// project imports

import Loadable from "ui-component/Loadable";
import GuestGuard from "utils/route-guard/GuestGuard";
const LoginLayout = Loadable(lazy(() => import("layout/LoginLayout")));
const PublicDenied = Loadable(lazy(() => import("forms/public/PublicDenied")));
const HomePage = Loadable(lazy(() => import("forms/public/HomePage")));
// ==============================|| AUTH ROUTING ||============================== //

const PublicRoutes = {
	path: "/",
	element: (
		<GuestGuard>
			<LoginLayout />
		</GuestGuard>
	),
	children: [
		{
			path: "*",
			element: <PublicDenied />
		},
		{
			path: "/",
			element: <HomePage />
		}
	]
};
export default PublicRoutes;
