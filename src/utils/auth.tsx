import cookies from "js-cookie";

export const setCookie = (token: string, cookieName: string) => {
	const inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000);
	cookies.set(cookieName, token, {
		expires: inTwoHours,
	});
};

export const removeCookie = (cookieName: string) => {
	cookies.remove(cookieName);
};

export const getCookie = (cookieName: string) => {
	return cookies.get(cookieName);
};
