/// <reference types="vite/client" />
/// <reference types="redux-thunk/extend-redux" />
declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}
