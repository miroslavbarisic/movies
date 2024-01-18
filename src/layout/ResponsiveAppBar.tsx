import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const ResponsiveAppBar = ({ homeRoute, favoritesRoute }) => {
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
							color: "#e4bb24;",
							textDecoration: "none",
							justifyContent: "center",
							"& a": {
								color: "inherit",
								textDecoration: "none",
							},
						}}
					>
						<Link to={homeRoute}>MOVIES</Link>
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
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "#e4bb24;",
							textDecoration: "none",
							"& a": {
								color: "inherit",
								textDecoration: "none",
							},
						}}
					>
						<Link to={homeRoute}>MOVIES</Link>
					</Typography>

					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							display: { xs: "none", md: "flex" },
							flexGrow: 15,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".1rem",
							color: "inherit",
							textDecoration: "none",
							"& a": {
								color: "inherit",
								textDecoration: "none",
								marginLeft: "20px",
							},
						}}
					>
						<Link to={homeRoute} sx={{ marginLeft: "100px" }}>
							HOME
						</Link>
						<Link to={favoritesRoute} sx={{ marginLeft: "40px" }}>
							FAVORITES
						</Link>
					</Typography>
				</Toolbar>
			</Container>

			{/* Responsive Drawer */}
			<Drawer anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
				<List>
					<ListItem
						onClick={handleToggleDrawer}
						component={Link}
						to={homeRoute}
						sx={{ color: "white" }}
					>
						<ListItemText primary="HOME" />
					</ListItem>
					<ListItem
						onClick={handleToggleDrawer}
						component={Link}
						to={favoritesRoute}
						sx={{ color: "white" }}
					>
						<ListItemText primary="FAVORITES" />
					</ListItem>
				</List>
			</Drawer>
		</AppBar>
	);
};

export default ResponsiveAppBar;
