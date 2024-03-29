import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/user/UserContextProvider";
import styles from "./index.module.css";

const ResponsiveAppBar = () => {
	const token = localStorage.getItem("auth_token");
	const userContext = useContext(UserContext);
	const signOut = userContext?.signOut;
	const location = useLocation();
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const handleToggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<IconButton
						size="large"
						aria-label="menu"
						edge="start"
						color="inherit"
						onClick={handleToggleDrawer}
						sx={{ mr: 0, display: { xs: "block", md: "none" } }}
					>
						<MenuIcon />
					</IconButton>

					{/* Logo for mobile view */}
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "#e4bb24",
							textDecoration: "none",
							justifyContent: "center",
							"& a": {
								color: "inherit",
								textDecoration: "none",
							},
						}}
					>
						<Link to="/">MOVIES</Link>
					</Typography>

					{/* Logo for desktop view and other content */}
					<Typography
						variant="h5"
						noWrap
						component="div"
						sx={{
							display: { xs: "none", md: "flex" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontSize: "1.6rem",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "#e4bb24",
							textDecoration: "none",
							"& a": {
								color: "inherit",
								textDecoration: "none",
								marginLeft: "20px",
							},
						}}
					>
						<Link to="/">MOVIES</Link>
					</Typography>

					<Typography
						variant="h5"
						noWrap
						component="div"
						sx={{
							display: { xs: "none", md: "flex" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontSize: "1rem",
							fontWeight: 700,
							letterSpacing: ".3rem",
							textDecoration: "none",
							"& a": {
								textDecoration: "none",
								marginLeft: "20px",
							},
						}}
					>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? styles.active : styles.default
							}
						>
							HOME
						</NavLink>
						<NavLink
							to="/favorites"
							className={({ isActive }) =>
								isActive ? styles.active : styles.default
							}
						>
							FAVORITES
						</NavLink>
						{token ? (
							<IconButton
								size="small"
								color="inherit"
								onClick={signOut}
								sx={{ marginLeft: "auto", padding: 0, verticalAlign: "center" }}
							>
								<LogoutIcon />
							</IconButton>
						) : (
							location.pathname !== "/login" && (
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive ? styles.active : styles.default
									}
								>
									LOGIN
								</NavLink>
							)
						)}
						{location.pathname === "/login" && (
							<NavLink
								to="/signup"
								className={({ isActive }) =>
									isActive ? styles.active : styles.default
								}
							>
								SIGNUP
							</NavLink>
						)}
					</Typography>
				</Toolbar>
			</Container>

			{/* Responsive Drawer */}
			<Drawer anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
				<List>
					<ListItem
						onClick={handleToggleDrawer}
						component={Link}
						to="/"
						sx={{ color: "white" }}
					>
						<ListItemText primary="HOME" />
					</ListItem>
					<ListItem
						onClick={handleToggleDrawer}
						component={Link}
						to="falorites"
						sx={{ color: "white" }}
					>
						<ListItemText primary="FAVORITES" />
					</ListItem>
					{token ? (
						<IconButton
							size="small"
							color="inherit"
							onClick={signOut}
							sx={{ color: "white", marginLeft: "10px" }}
						>
							<LogoutIcon />
						</IconButton>
					) : (
						location.pathname !== "/login" && (
							<ListItem
								onClick={handleToggleDrawer}
								component={Link}
								to="/login"
								sx={{ color: "white" }}
							>
								<ListItemText primary="LOGIN" />
							</ListItem>
						)
					)}
					{location.pathname === "/login" && (
						<ListItem
							onClick={handleToggleDrawer}
							component={Link}
							to="/signup"
							sx={{ color: "white" }}
						>
							<ListItemText primary="SIGNUP" />
						</ListItem>
					)}
				</List>
			</Drawer>
		</AppBar>
	);
};

export default ResponsiveAppBar;
