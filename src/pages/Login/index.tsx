import React from "react";
import { setCookie } from "../../utils/auth";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export default function Login() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const storedEmail = localStorage.getItem("email");
	const storedPassword = localStorage.getItem("password");

	const payload = {
		email: storedEmail,
		role: "user",
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
	};
	const token = JSON.stringify(payload);
	const onSubmit = (data) => {
		if (data.Email === storedEmail && data.Password === storedPassword) {
			setCookie(token, "auth_token");
			localStorage.setItem("auth_token", token);
			navigate("/");
		} else {
			setError("Email", {
				type: "manual",
				message: "Wrong e-mail or password",
			});
			setError("Password", {
				type: "manual",
				message: "Wrong e-mail or password",
			});
		}
	};

	return (
		<Container className={styles.signupContainer}>
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
			>
				<Grid item>
					<Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
						LOG IN
					</Typography>
				</Grid>
				<Grid item>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack direction="column" spacing={2}>
							<TextField
								type="text"
								label="Email"
								placeholder="Email"
								{...register("Email", {
									required: true,
									pattern: /^\S+@\S+$/i,
								})}
								error={!!errors.Email}
								helperText={errors.Email?.message || ""}
								sx={{ width: { xs: "100%", md: "400px" } }}
							/>
							<TextField
								type="password"
								label="Password"
								placeholder="Password"
								{...register("Password", { required: true })}
								error={!!errors.Password}
								helperText={errors.Password?.message || ""}
								sx={{ width: { xs: "100%", md: "400px" } }}
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								sx={{ width: { xs: "100%", md: "400px" } }}
							>
								LOG IN
							</Button>
						</Stack>
					</form>
				</Grid>
			</Grid>
		</Container>
	);
}
