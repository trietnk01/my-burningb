import { lazy } from "react";

// project imports

import Loadable from "ui-component/Loadable";
const ProductList = Loadable(lazy(() => import("forms/admin/product/ProductList")));
// ==============================|| AUTH ROUTING ||============================== //

const PublicRoutes = {
	path: "/",
	element: <ProductList />
};
export default PublicRoutes;
