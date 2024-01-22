import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig, loadEnv } from "vite";

dotenv.config();

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		define: {
			"process.env": {
				VITE_API_BASE_URL: JSON.stringify(process.env.VITE_API_BASE_URL),
			},
		},
		plugins: [react()],
		server: {
			host: true,
			port: 3022,
		},
	});
};
