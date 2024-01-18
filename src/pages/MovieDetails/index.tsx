import type { ReactElement, FC } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";
import styles from "./index.module.css";
import { fetchMovie } from "../../utils/service";
import Skeleton from "./Skeleton";
import YouTubeVideo from "../../components/YouTubeVideo";
import moment from "moment";
import type MovieDetailsSuccessProps from "../../common/types";

const MovieDetailsSuccess: FC<MovieDetailsSuccessProps> = ({ data }) => (
	<>
		<Grid container justifyContent="center" p={2}>
			<Grid item xs={12} sm={10}>
				<Grid container>
					<Grid item xs={12} sm={4} className={styles.poster}>
						<img src={`https://image.tmdb.org/t/p/w780${data.poster_path}`} alt={data.title} height="600"
								 width="100%" />
					</Grid>
					<Grid item xs={12} sm={8} className={styles.detailsSection}>
						<div className={styles.titleContainer}>
							<div className={styles.title}>{data.title}</div>
							<div className={styles.ratingsRoot}>
								<StarIcon fontSize="large" htmlColor="#e4bb24" />
								<div>
									<div className={styles.ratingsContainer}>
										{data.vote_average}
										<i>/10</i>
									</div>
									<div className={styles.votes}>{data.vote_count}</div>
								</div>
							</div>
						</div>
						<div className={styles.subInfo}>
							<div>{moment(data.release_date).format("MMMM DD YYYY")}</div>
							<div>{data.runtime} min</div>
						</div>

						<div className={styles.plot}>{data.overview}</div>

						<Divider />

						<Grid container className={styles.metaData}>
							<Grid item xs={3} md={2} className={styles.metaLabel}>
								Genre :
							</Grid>
							<Grid item xs={9} md={10} className={styles.metaValue}>
								{data.genres.map((genre, index) => (
									`${genre.name}${index < data.genres.length - 1 ? ", " : ""}`
								))}
							</Grid>
						</Grid>
						<Grid container className={styles.metaData}>
							<Grid item xs={3} md={2} className={styles.metaLabel}>
								Cast :
							</Grid>
							<Grid item xs={9} md={10} className={styles.metaValue}>
								{data.credits.cast.map((cast, index) => (
									`${cast.name}${index < data.credits.cast.length - 1 ? ", " : ""}`
								))}
							</Grid>
						</Grid>
						<Grid container className={styles.metaData}>
							<Grid item xs={3} md={2} className={styles.metaLabel}>
								Language :
							</Grid>
							<Grid item xs={9} md={10} className={styles.metaValue}>
								{data.spoken_languages.map((lang, index) => (
									`${lang.name}${index < data.spoken_languages.length - 1 ? ", " : ""}`
								))}
							</Grid>
						</Grid>
						<Grid container className={styles.metaData}>
							<Grid item xs={3} md={2} className={styles.metaLabel}>
								Country :
							</Grid>
							<Grid item xs={9} md={10} className={styles.metaValue}>
								{data.production_countries.map((country, index) => (
									`${country.name}${index < data.production_countries.length - 1 ? ", " : ""}`
								))}
							</Grid>
						</Grid>


					</Grid>
				</Grid>
			</Grid>
		</Grid>


		<Grid container justifyContent="center" p={2}>
			<Grid item xs={12} sm={10}>
				<Divider />
				<div className={styles.trailerContainer}>
					<h3 className={styles.titleTrailer}>Watch trailer</h3>
				</div>
				<Grid container>
					{data.videos.results.map((trailer) => (
						<Grid item xs={12} sm={6} key={trailer.id} className={styles.ytVideoContainer}>

							<YouTubeVideo videoId={trailer.key} className={styles.ytVideo} />
						</Grid>
					))}
				</Grid>

			</Grid>
		</Grid>

	</>
);

const MovieDetails = (): ReactElement => {
	const { movieId } = useParams<{ movieId: string }>();
	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ["movie"],
		queryFn: () => fetchMovie(movieId),
	});

	if (isLoading) {
		return <Skeleton />;
	}

	if (isSuccess) {
		return <MovieDetailsSuccess data={data} />;
	}

	if (error) {
		return <div>{JSON.stringify(error)}</div>;
	}

	// Redirect on error
	return <Navigate to="/" replace />;
};

export default MovieDetails;
