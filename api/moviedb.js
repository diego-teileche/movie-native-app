import axios from "axios"
import { apiKey } from "../constants/index"

// Endpoints

const apiBaseURL = "https://api.themoviedb.org/3"

const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?api_key=${apiKey}`

const upcomingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?api_key=${apiKey}`

const topRatedMoviesEndpoint = `${apiBaseURL}/movie/top_rated?api_key=${apiKey}`

const searchMoviesEndpoint = `${apiBaseURL}/search/movie?api_key=${apiKey}`

// Dynamic Endpoints

const movieDetailsEndpoint = (id) =>
	`${apiBaseURL}/movie/${id}?api_key=${apiKey}`

const movieCreditsEndpoint = (id) =>
	`${apiBaseURL}/movie/${id}/credits?api_key=${apiKey}`

const similarMoviesEndpoint = (id) =>
	`${apiBaseURL}/movie/${id}/similar?api_key=${apiKey}`

const personDetailsEndpoint = (id) =>
	`${apiBaseURL}/person/${id}?api_key=${apiKey}`

const personMoviesEndpoint = (id) =>
	`${apiBaseURL}/person/${id}/movie_credits?api_key=${apiKey}`

export const image500 = (path) =>
	path ? `https://image.tmdb.org/t/p/w500${path}` : null

export const image342 = (path) =>
	path ? `https://image.tmdb.org/t/p/w342${path}` : null

export const image185 = (path) =>
	path ? `https://image.tmdb.org/t/p/w185${path}` : null

export const fallbackMoviePoster =
	"https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?size=338&ext=jpg&ga=GA1.1.1488620777.1712016000&semt=ais"

const apiCall = async (endpoint, params) => {
	const options = {
		method: "GET",
		url: endpoint,
		params: params ? params : {},
	}

	try {
		const res = await axios.request(options)
		return res.data
	} catch (error) {
		console.log("error: ", error)
		return {}
	}
}

export const fetchTrendingMovies = () => {
	return apiCall(trendingMoviesEndpoint)
}

export const fetchUpcomingMovies = () => {
	return apiCall(upcomingMoviesEndpoint)
}

export const fetchTopRatedMovies = () => {
	return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = (id) => {
	return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = (id) => {
	return apiCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = (id) => {
	return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = (id) => {
	return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = (id) => {
	return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = (params) => {
	return apiCall(searchMoviesEndpoint, params)
}
