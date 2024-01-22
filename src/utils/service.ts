const VITE_API_TOKEN: string = import.meta.env.VITE_API_TOKEN;
const VITE_API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
const options = {
	headers: {
		Authorization: VITE_API_TOKEN,
		accept: "application/json",
	},
	method: "GET",
};

export async function fetchMovies(pageNumber: number) {
	const response = await fetch(
		`${VITE_API_BASE_URL}/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${pageNumber}&sort_by=popularity.desc`,
		options
	);
	return response.json();
}

export async function searchMovies(opt: { page: number; s: string }) {
	const response = await fetch(
		`${VITE_API_BASE_URL}/3/search/movie?query=${opt.s}&include_adult=false&language=en-US&page=${opt.page}`,
		options
	);
	return response.json();
}

export async function fetchMovie(movieId: number) {
	const response = await fetch(
		`${VITE_API_BASE_URL}/3/movie/${movieId}?append_to_response=videos,credits`,
		options
	);
	return response.json();
}

export async function fetchByRating(opt: {
	page: number;
	rangeFrom: number;
	rangeTo: number;
}) {
	const response = await fetch(
		`${VITE_API_BASE_URL}/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${opt.page}&sort_by=popularity.desc&vote_average.gte=${opt.rangeFrom}&vote_average.lte=${opt.rangeTo}`,
		options
	);
	return response.json();
}
