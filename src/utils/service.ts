const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2MxMDlkMzE2MTBjNDA3YjMyZjljNDE3MzE1ZmEwMyIsInN1YiI6IjY1OWZiMzIyOTA3ZjI2MDEyYjIwZTUzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uHQ6aP32IIbqJIWTNXo0o2-ucB6yDFNTF_qKPr3ijwQ'
  }
};


export async function fetchMovies(pageNumber:number) {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${pageNumber}&sort_by=popularity.desc`, options);
  return response.json();
}




export async function searchMovies(opt: { page: number, s: string }) {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${opt.s}&include_adult=false&language=en-US&page=${opt.page}`, options);
  return response.json();
}




export async function fetchMovie(movieId:number) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,credits`, options);
  return response.json();
}
