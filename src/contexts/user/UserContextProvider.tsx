import {
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { getCookie, removeCookie } from "../../utils/auth";

interface UserContextProps {
	token: string | undefined;
	setToken: Dispatch<SetStateAction<string | undefined>>;
	signOut: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
	children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const [token, setToken] = useState<string | undefined>(
		getCookie("auth_token")
	);

	useEffect(() => {
		if (token) {
			const now = new Date().getTime() / 1000;
			const userProfile = JSON.parse(token);
			if (userProfile.exp && now > userProfile.exp) {
				removeCookie("auth_token");
				setToken(undefined);
				localStorage.clear();
				window.location.reload();
			} else {
				setToken(token);
			}
		} else {
			setToken(undefined);
		}
	}, [token]);

	// sign out the user, memoized
	const signOut = useCallback(() => {
		setToken(undefined);
		localStorage.clear();
		window.location.reload();
	}, []);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			token,
			setToken,
			signOut,
		}),
		[token, setToken, signOut]
	);

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
