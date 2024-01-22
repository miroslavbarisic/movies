import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig, loadEnv } from "vite";
import eslintPlugin from "vite-plugin-eslint";

dotenv.config();

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		build: {
			outDir: "build",
			sourcemap: true,
		},
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
