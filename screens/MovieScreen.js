import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	Platform,
	Image,
	StatusBar,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useEffect, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { styles, theme } from "../themes/index"
import { LinearGradient } from "expo-linear-gradient"
import Cast from "../components/Cast"
import MovieList from "../components/movieList"
import Loading from "../components/Loading"
import {
	fallbackMoviePoster,
	fetchMovieCredits,
	fetchMovieDetails,
	fetchSimilarMovies,
	image500,
} from "../api/moviedb"

var { width, height } = Dimensions.get("window")
const ios = Platform.OS == "ios"
const topMargin = ios ? "" : "mt-3"

export default function MovieScreen() {
	const { params: item } = useRoute()
	const navigation = useNavigation()
	const [isFavorite, setIsFavorite] = useState(false)
	const [cast, setCast] = useState([])
	const [similarMovies, setSimilarMovies] = useState([])
	const [loading, setLoading] = useState(false)
	const [movie, setMovie] = useState({})

	useEffect(() => {
		setLoading(true)
		getMovieDetails(item.id)
		getMovieCredits(item.id)
		getSimilarMovies(item.id)
	}, [item])

	const getMovieDetails = async (id) => {
		const data = await fetchMovieDetails(id)
		if (data) setMovie(data)
		setLoading(false)
	}

	const getMovieCredits = async (id) => {
		const data = await fetchMovieCredits(id)
		if (data && data.cast) setCast(data.cast)
	}

	const getSimilarMovies = async (id) => {
		const data = await fetchSimilarMovies(id)
		if (data && data.results) setSimilarMovies(data.results)
	}

	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: 20 }}
			className="flex-1 bg-neutral-900"
		>
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={"light-content"}
			/>

			<View className="w-full">
				<SafeAreaView
					className={
						"absolute z-20 w-full flex-row justify-between items-center px-4 " +
						topMargin
					}
				>
					<TouchableOpacity
						className="rounded-xl p-1"
						style={styles.background}
						onPress={() => navigation.goBack()}
					>
						<ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
					</TouchableOpacity>

					<TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
						<HeartIcon
							size={35}
							color={isFavorite ? theme.background : "white"}
						/>
					</TouchableOpacity>
				</SafeAreaView>

				{loading ? (
					<Loading />
				) : (
					<View>
						<Image
							source={{
								uri: image500(movie?.poster_path) || fallbackMoviePoster,
							}}
							style={{ width, height: height * 0.55 }}
						/>

						<LinearGradient
							colors={[
								"transparent",
								"rgba(23, 23, 23, 0.8)",
								"rgba(23, 23, 23, 1)",
							]}
							style={{ width, height: height * 0.4 }}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
							className="absolute bottom-0"
						/>
					</View>
				)}
			</View>

			<View className="space-y-3" style={{ marginTop: -(height * 0.09) }}>
				<Text className="text-white text-center text-3xl font-bold tracking-wider">
					{movie?.title}
				</Text>

				{movie?.id ? (
					<Text className="text-neutral-400 font-semibold text-base text-center">
						{movie?.status} | {movie?.release_date?.split("-")[0]} |{" "}
						{movie?.runtime} min
					</Text>
				) : null}

				<View className="flex-row justify-center mx-4 space-x-1">
					{movie?.genres?.map((genre, index) => {
						let showDot = index + 1 != movie.genres.length

						return (
							<Text
								className="text-neutral-400 font-semibold text-base text-center"
								key={index}
							>
								{genre?.name} {showDot ? "|" : null}
							</Text>
						)
					})}
				</View>

				<Text
					className="text-neutral-400 font-semibold mx-4 tracking-wide p-2 rounded-lg border"
					style={styles.border}
				>
					{movie?.overview}
				</Text>
			</View>

			{cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

			{similarMovies.length > 0 && (
				<MovieList
					title="Similar Movies"
					data={similarMovies}
					hideSeeAll={true}
				/>
			)}
		</ScrollView>
	)
}
