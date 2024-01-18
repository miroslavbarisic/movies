import type { ReactElement, FormEvent } from "react";
import { useRef } from "react";
import { Paper, InputBase, IconButton, createTheme, ThemeProvider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchBoxProps = {
	onChange: (text: string) => void;
	className?: string;
};

const defaultProps: SearchBoxProps = {
	onChange: () => {
	},
	className: "",
};

const theme = createTheme({
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					padding: "2px 4px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#000000",
					border: "1px solid #ffffff",
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					marginLeft: 10,
					flex: 1,
					color: "#ffffff",
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					padding: 10,
					color: "#ffffff",
				},
			},
		},
	},
});

const SearchBox = ({ onChange, className }: SearchBoxProps): ReactElement => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleChange = () => {
		const inputValue = inputRef.current?.value || "";
		onChange(inputValue);
	};

	const handleInput = () => {
		handleChange();
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		handleChange();
	};

	return (
		<ThemeProvider theme={theme}>
			<Paper component="form" className={className} onSubmit={handleSubmit}>
				<InputBase
					placeholder="Search for a movie"
					inputRef={inputRef}
					fullWidth
					onInput={handleInput}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSubmit(e);
						}
					}}
				/>
				<IconButton type="submit">
					<SearchIcon />
				</IconButton>
			</Paper>
		</ThemeProvider>
	);
};
SearchBox.defaultProps = defaultProps;

export default SearchBox;
