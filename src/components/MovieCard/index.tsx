import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import StarIcon from "@mui/icons-material/Star";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";
import styles from "./index.module.css";

export type MovieCardProps = {
	page: {
		title: string;
		id: number;
		vote_average: number;
		release_date: Date;
		backdrop_path: string;
		vote_count: number;
	};
	onRemoveFromFavorites: () => void;
};

const MovieCard = ({ page, onRemoveFromFavorites }: MovieCardProps) => {
	const navigate = useNavigate();
	const [isBookmarked, setIsBookmarked] = useState(null);

	useEffect(() => {
		try {
			if (window?.localStorage?.getItem(page.id)) {
				setIsBookmarked(true);
			} else {
				setIsBookmarked(false);
			}
		} catch (error) {
			console.log("Unable to access localStorage" + error);
		}
	}, [page.id]);

	const handleMovieSelect = () => {
		navigate(`/${page.id}`);
	};

	return (
		<Card className={styles.root}>
			<CardActionArea className={styles.cardArea} onClick={handleMovieSelect}>
				<CardMedia
					component="img"
					alt={page.title}
					height="400"
					image={`https://image.tmdb.org/t/p/w780${page.backdrop_path}`}
					title={page.title}
					className={styles.poster}
				/>
				<CardContent className={styles.overText}>
					<Typography variant="h6" component="div">
						{page.title}
					</Typography>

				</CardContent>
			</CardActionArea>
			<CardActions className={styles.actionsContainer}>
				<Typography
					gutterBottom
					component="div"
					className={styles.yearSection}
					variant="subtitle2"
				>
					<CalendarTodayIcon fontSize="small" />
					&nbsp;
					{moment(page.release_date).format("MM/DD/YYYY")}
				</Typography>

				<IconButton
					aria-label="add to favorites"
					onClick={() => {
						try {
							setIsBookmarked(!isBookmarked);
							if (isBookmarked) {
								onRemoveFromFavorites();
							} else {
								window?.localStorage.setItem(page.id, JSON.stringify(page));
							}
						} catch (error) {
							console.log("Unable to Bookmark this item because localStorage is not accessible");
						}
					}}
				>
					{isBookmarked ? <FavoriteIcon className={styles.favFilled} /> : <FavoriteBorderIcon />}
				</IconButton>
				<Typography component="div" className={styles.ratingsRoot}>
					<StarIcon fontSize="medium" htmlColor="#e4bb24" />
					<div>
						<div className={styles.ratingsContainer}>
							{page.vote_average}
							<i>/10</i>
						</div>
					</div>
				</Typography>
			</CardActions>
		</Card>
	);
};

export default MovieCard;