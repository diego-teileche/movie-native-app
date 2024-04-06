import axios from "axios"
import { apiKey } from "../constants/index"

const apiBaseURL = "https://api.themoviedb.org/3"

const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?api_key=${apiKey}`

const upcomingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?api_key=${apiKey}`

const topRatedMoviesEndpoint = `${apiBaseURL}/movie/top_rated?api_key=${apiKey}`

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
