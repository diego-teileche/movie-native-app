import {
	View,
	Text,
	Dimensions,
	Platform,
	ScrollView,
	TouchableOpacity,
	Image,
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { useNavigation, useRoute } from "@react-navigation/native"
import { styles, theme } from "../themes"
import { Shadow } from "react-native-shadow-2"
import MovieList from "../components/movieList"
import Loading from "../components/Loading"
import {
	fallbackMoviePoster,
	fetchPersonDetails,
	fetchPersonMovies,
	image342,
} from "../api/moviedb"

var { width, height } = Dimensions.get("window")
const ios = Platform.OS == "ios"
const verticalMargin = ios ? "" : " my-3"

export default function PersonScreen() {
	const { params: item } = useRoute()
	const navigation = useNavigation()
	const [isFavorite, setIsFavorite] = useState(false)
	const [personMovies, setPersonMovies] = useState([])
	const [person, setPerson] = useState({})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		getPersonDetails(item.id)
		getPersonMovies(item.id)
	}, [item])

	const getPersonDetails = async (id) => {
		const data = await fetchPersonDetails(id)
		setPerson(data)
		setLoading(false)
	}

	const getPersonMovies = async (id) => {
		const data = await fetchPersonMovies(id)
		if (data && data.cast) setPersonMovies(data.cast)
	}

	return (
		<ScrollView className="flex-1 bg-neutral-900">
			<SafeAreaView
				className={
					"z-20 w-full flex-row justify-between items-center px-4 " +
					verticalMargin
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
					<View className="flex-row justify-center h-[280px]">
						<Shadow
							distance={50}
							startColor={"#ddd3"}
							endColor={"#1111"}
							finalColor={"#0f0f0f"}
							offset={[0, 5]}
						>
							<View
								style={{
									alignItems: "center",
									borderRadius: 200,
									overflow: "hidden",
									height: 270,
									width: 270,
									borderWidth: 4,
									borderColor: "gray",
								}}
							>
								<Image
									source={{
										uri: image342(person?.profile_path) || fallbackMoviePoster,
									}}
									style={{ height: height * 0.43, width: width * 0.74 }}
								/>
							</View>
						</Shadow>
					</View>

					<View className="mt-4">
						<Text className="text-3xl text-white font-bold text-center">
							{person?.name}
						</Text>
						<Text className="text-base text-neutral-500 font-bold text-center">
							{person?.place_of_birth}
						</Text>
					</View>

					<View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
						<View className="border-r-2 border-r-neutral-400 px-2 items-center">
							<Text className="text-white font-semibold pr-1">Gender</Text>
							<Text className="text-neutral-300 font-sm pr-1">
								{person?.gender == 1 ? "Female" : "Male"}
							</Text>
						</View>
						<View className="border-r-2 border-r-neutral-400 px-2 items-center">
							<Text className="text-white font-semibold pr-1">Birthday</Text>
							<Text className="text-neutral-300 font-sm pr-1">
								{person?.birthday}
							</Text>
						</View>
						<View className="border-r-2 border-r-neutral-400 px-2 items-center">
							<Text className="text-white font-semibold pr-1">Known for</Text>
							<Text className="text-neutral-300 font-sm pr-1">
								{person?.known_for_department}
							</Text>
						</View>
						<View className="px-2 items-center">
							<Text className="text-white font-semibold pr-1">Populaty</Text>
							<Text className="text-neutral-300 font-sm pr-1">
								{person?.popularity?.toFixed(2)} %
							</Text>
						</View>
					</View>

					<View className="my-6 mx-4 space-y-2">
						<Text className="text-white text-lg">Biography</Text>
						<Text
							className="text-neutral-400 tracking-wide px-2 py-1 rounded-lg border"
							style={styles.border}
						>
							{person?.biography || "N/A"}
						</Text>
					</View>

					<MovieList
						title={`Movies of ${person?.name}`}
						hideSeeAll={true}
						data={personMovies}
					/>
				</View>
			)}
		</ScrollView>
	)
}
