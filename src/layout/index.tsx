import type { FC } from "react";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import ScrollToTop from "../components/ScrollToTop";
import Fallback from "../components/Fallback";
import ResponsiveAppBar from "./ResponsiveAppBar";

const Home = lazy(() => import("../pages/Home"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const Favorites = lazy(() => import("../pages/Favorites"));

import styles from "./index.module.css";

interface PropType {
	authenticated: boolean;
}

type Props = {
	children: React.ReactNode;
};
const Layout = (props: PropType): React.ReactElement => {
	const { authenticated } = props;

	const PrivateRoute: FC<Props> = ({ children }) => {
		if (authenticated) {
			return <>{children}</>;
		}
		return <Navigate to="/" replace />;
	};


	return (
		<Router>
			<ResponsiveAppBar homeRoute="/" favoritesRoute="/favorites" />
			<Paper square className={styles.root}>
				<ScrollToTop />
				<Suspense fallback={<Fallback />}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/favorites" element={<PrivateRoute key="favorites"><Favorites /></PrivateRoute>} />
						<Route path="/:movieId" element={<MovieDetails />} />
					</Routes>
				</Suspense>
			</Paper>
		</Router>
	);
};

export default Layout;
