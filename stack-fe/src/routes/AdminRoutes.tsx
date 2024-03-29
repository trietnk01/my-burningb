import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";
const MainLayout = Loadable(lazy(() => import("layout/MainLayout")));
// widget routing
const Dashboard = Loadable(lazy(() => import("forms/admin/Dashboard")));
const AdminDenied = Loadable(lazy(() => import("forms/admin/AdminDenied")));
// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
	path: "/",
	element: (
		<AuthGuard>
			<MainLayout />
		</AuthGuard>
	),
	children: [
		{
			path: "*",
			element: <AdminDenied />
		},
		{
			path: "admin/dashboard",
			element: <Dashboard />
		}
	]
};

export default AdminRoutes;
