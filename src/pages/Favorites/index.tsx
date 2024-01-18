import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../../components/MovieCard";
import Skeleton from "../../components/MovieCard/Skeleton";
import styles from "./index.module.css";

const Favorites = (): ReactElement => {
	const [localStorageData, setLocalStorageData] = useState(null);

	useEffect(() => {
		try {
			const data = window?.localStorage;
			setLocalStorageData(data);
		} catch (error) {
			console.log(error);
			setLocalStorageData(false);
		}
	}, []);

	const handleRemoveFromFavorites = (movieId: number) => {
		try {
			const localStorageKey = movieId.toString();
			window?.localStorage.removeItem(localStorageKey);
			setLocalStorageData({ ...window.localStorage });
		} catch (error) {
			console.log("Unable to remove item from favorites", error);
		}
	};
	const MoviesLoader = (itemCount: number): ReactElement => (
		<Grid container spacing={2}>
			{[...Array(itemCount)].map((_, i: number) => (
				<Grid item xs={12} md={3} key={i}>
					<Skeleton />
				</Grid>
			))}
		</Grid>
	);
	return (
		<div className={styles.root}>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10}>
					<Grid item xs={12} className={styles.movieListContainer}>
						<Grid container spacing={2}>
							{localStorageData
								? Object.keys(localStorageData).filter(key => !isNaN(key)).length === 0
									? <p>No Favorites Yet!</p>
									: Object.keys(localStorageData).filter(key => !isNaN(key)).map((key, index) => (
										<Grid item xs={12} md={3} key={index}>
											<MovieCard
												key={index}
												page={{ ...JSON.parse(localStorageData[key]) }}
												onRemoveFromFavorites={() => {
													handleRemoveFromFavorites(Number(key));
												}}
											/>
										</Grid>
									))
								: MoviesLoader(8)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Favorites;