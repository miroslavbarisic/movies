import type { FC } from "react";
import React, { lazy, Suspense } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import Fallback from "../components/Fallback";

const Home = lazy(() => import("../pages/Home"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const Favorites = lazy(() => import("../pages/Favorites"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Login = lazy(() => import("../pages/Login"));

interface PropType {
	authenticated: boolean;
}

type Props = {
	children: React.ReactNode;
};
const MainRouter = (props: PropType): React.ReactElement => {
	const { authenticated } = props;

	const PrivateRoute: FC<Props> = ({ children }) => {
		if (authenticated) {
			return <>{children}</>;
		}
		return <Navigate to="/login" replace />;
	};

	return (
		<Suspense fallback={<Fallback />}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/favorites"
					element={
						<PrivateRoute key="favorites">
							<Favorites />
						</PrivateRoute>
					}
				/>
				<Route path="/:movieId" element={<MovieDetails />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Suspense>
	);
};

export default MainRouter;
