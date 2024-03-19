import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Loader } from "./Loader/Loader";
import { Header } from "./Header/Header";

export const Layout = () => {
	const location = useLocation();
	return (
		<>
			<Header location={location.pathname}/>
			<main>
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
			</main>
		</>
	);
};
