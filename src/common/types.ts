export default interface MovieDetailsSuccessProps {
	data: {
		title: string;
		id: number;
		vote_average: number;
		release_date: Date;
		poster_path: string;
		vote_count: number;
		runtime: number;
		overview: string;
		genres: [{
			name: string;
		}]
		original_language: string;
		production_countries: [{
			name: string;
		}]
		spoken_languages: [{
			name: string;
		}]
		credits: {
			cast: [{
				name: string;
			}]
		}
		videos: {
			results: [{
				id: string;
				key: string;
			}]
		}
	};
}