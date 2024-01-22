import React, { useState } from "react";
import type { ReactElement } from "react";
import styles from "./index.module.css";
import SearchBox from "../../components/SearchBox";
import { fetchMovies, searchMovies, fetchByRating } from "../../utils/service";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "../../components/MovieCard";
import Skeleton from "../../components/MovieCard/Skeleton";
import Grid from "@mui/material/Grid";
import InfiniteScroll from "react-infinite-scroll-component";
import RatingFilter from "../../components/RatingFilter";

const Home = (): ReactElement => {
	const [searchText, setSearchText] = useState("");
	const [filterValue, setFilterValue] = useState(0);
	const handleSearchChange = (text: string) => {
		setSearchText(text);
	};

	const handleFilterChange = (value: number) => {
		setFilterValue(value);
	};

	const removeFromFavorites = (movieId: number) => {
		try {
			window?.localStorage.removeItem(movieId.toString());
		} catch (error) {
			console.log("Unable to remove movie from favorites in localStorage");
		}
	};

	const { data, error, fetchNextPage, hasNextPage, isSuccess, isLoading } =
		useInfiniteQuery({
			queryKey: ["movies", searchText, filterValue],
			queryFn: ({ pageParam }) => {
				if (searchText.length > 0) {
					return searchMovies({ s: searchText, page: pageParam });
				} else if (Array.isArray(filterValue) && filterValue[1] > 1) {
					// Only call fetchByRating if the upper range in filterValue is greater than 1
					return fetchByRating({
						rangeFrom: filterValue[0],
						rangeTo: filterValue[1],
						page: pageParam,
					});
				} else {
					return fetchMovies(pageParam);
				}
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				if (lastPage.results.length === 0) {
					return undefined;
				}
				return lastPage.page + 1;
			},
			enabled:
				Boolean(searchText) ||
				(Array.isArray(filterValue) && filterValue[1] > 1) ||
				undefined,
		});

	const MoviesLoader = (itemCount: number): ReactElement => (
		<Grid container spacing={2}>
			{Array.from(new Array(itemCount)).map((_, i: number) => (
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
					<Grid container justifyContent="center" spacing={4}>
						<Grid item xs={11} md={4}>
							<SearchBox
								className={styles.searchBox}
								onChange={handleSearchChange}
							/>
						</Grid>
						<Grid item xs={11} md={3}>
							<RatingFilter onChange={handleFilterChange} />
						</Grid>
					</Grid>

					<Grid item xs={12} className={styles.movieListContainer}>
						{isLoading ? (
							MoviesLoader(8)
						) : (
							<>
								{isSuccess && data?.pages?.length > 0 ? (
									<InfiniteScroll
										dataLength={
											data?.pages.map((page) => page.results).flat()?.length ??
											0
										}
										next={fetchNextPage}
										hasMore={hasNextPage || false}
										loader={MoviesLoader(4)}
										style={{ overflow: "hidden" }}
									>
										<Grid container spacing={2}>
											{data?.pages
												.map((page) => page?.results)
												.flat()
												.map((page) => (
													<Grid item xs={12} md={3} key={page?.id}>
														<MovieCard
															page={page}
															onRemoveFromFavorites={() => {
																removeFromFavorites(page.id);
															}}
														/>
													</Grid>
												))}
										</Grid>
									</InfiniteScroll>
								) : (
									<div className={styles.errorMessageContainer}>
										No Results Found
									</div>
								)}
							</>
						)}

						{!!error && (
							<div className={styles.errorMessageContainer}>
								{JSON.stringify(error)}
							</div>
						)}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;
