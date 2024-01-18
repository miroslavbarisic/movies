import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import '../index.css';
import App from "./App";
import { store } from './redux/store';

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<Provider store={store}>
			<App />
			</Provider>
		</React.StrictMode>
	);
}
