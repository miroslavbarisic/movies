import type { FC } from "react";
import React, { useState, useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import MainRouter from "./MainRouter";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import ScrollToTop from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import { UserContext } from "./contexts/user/UserContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";

const queryClient = new QueryClient();

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					// boxShadow: "2px 2px 2px 0px rgba(255,255,255, 0.5)",
				},
			},
		},
	},
	typography: {
		fontFamily: "inherit",
	},
});

const App: FC = () => {
	const userContext = useContext(UserContext);
	//const token = userContext?.token;
	const token = localStorage.getItem("auth_token");
	const location = useLocation();
	const navigate = useNavigate();

	const [authenticated, setAuthenticated] = useState<boolean>(true);
	useEffect(() => {
		let destination = "/login";

		if (token) {
			setAuthenticated(true);
			destination = location.pathname === "/login" ? "/" : location.pathname;
		} else {
			setAuthenticated(false);
		}

		navigate(destination, { replace: true });
	}, [token]);
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={darkTheme}>
				<div className="App">
					<Paper square>
						<ResponsiveAppBar />
						<MainRouter authenticated={authenticated} />
						<ScrollToTop />
					</Paper>
				</div>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
