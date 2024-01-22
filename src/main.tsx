import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "../index.css";
import App from "./App";
import { UserProvider } from "./contexts/user/UserContextProvider";

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<UserProvider>
				<Router>
					<App />
				</Router>
			</UserProvider>
		</React.StrictMode>
	);
}
