import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export default function SignUp() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const onSubmit = (data) => {
		localStorage.setItem("email", data.Email);
		localStorage.setItem("password", data.Password);
		navigate("/login");
	};

	const password = watch("Password", "");
	const emailPattern = /^\S+@\S+$/i;

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
						SIGN UP
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
									required: "Email is required",
									pattern: {
										value: emailPattern,
										message: "Invalid email address",
									},
								})}
								sx={{ width: { xs: "100%", md: "400px" } }}
								error={!!errors.Email}
								helperText={errors.Email?.message}
							/>
							<TextField
								type="password"
								label="Password"
								placeholder="Password"
								{...register("Password", { required: "Password is required" })}
								sx={{ width: { xs: "100%", md: "400px" } }}
								error={!!errors.Password}
								helperText={errors.Password?.message}
							/>
							<TextField
								type="password"
								label="Repeat Password"
								placeholder="Repeat Password"
								{...register("RepeatPassword", {
									required: "Repeat Password is required",
									validate: (value) =>
										value === password || "Passwords do not match",
								})}
								sx={{ width: { xs: "100%", md: "400px" } }}
								error={!!errors.RepeatPassword}
								helperText={errors.RepeatPassword?.message}
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								sx={{ width: { xs: "100%", md: "400px" } }}
							>
								SIGN UP
							</Button>
						</Stack>
					</form>
				</Grid>
			</Grid>
		</Container>
	);
}
