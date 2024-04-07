import {
	View,
	Text,
	Dimensions,
	StatusBar,
	Platform,
	TextInput,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
	Image,
} from "react-native"
import React, { useCallback, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"
import Loading from "../components/Loading"
import { debounce } from "lodash"
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb"

var { width, height } = Dimensions.get("window")

export default function SearchScreen() {
	const navigation = useNavigation()
	const [results, setResults] = useState([1, 2, 3, 4])
	const [loading, setLoading] = useState(false)
	let movieName = "Diegoooooooooooooooooooooo"

	const handleSearch = (value) => {
		if (value && value.length > 2) {
			setLoading(true)
			searchMovies({
				query: value,
				include_adult: "false",
				language: "en-US",
				page: "1",
			}).then((data) => {
				setLoading(false)
				if (data && data.results) setResults(data.results)
			})
		} else {
			setLoading(false)
			setResults([])
		}
	}

	const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

	return (
		<SafeAreaView className="bg-neutral-800 flex-1">
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={"light-content"}
			/>

			<View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
				<TextInput
					onChangeText={handleTextDebounce}
					placeholder="Search Movie"
					placeholderTextColor={"lightgray"}
					className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
				/>
				<TouchableOpacity
					className="rounded-full p-3 m-1 bg-neutral-500"
					onPress={() => navigation.navigate("Home")}
				>
					<XMarkIcon size="25" color="white" />
				</TouchableOpacity>
			</View>
			{loading ? (
				<Loading />
			) : results.length > 0 ? (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 15 }}
					className="space-y-3"
				>
					<Text className="text-white font-semibold ml-1">
						Results ({results.length})
					</Text>

					<View className="flex-row justify-between flex-wrap">
						{results.map((item, index) => {
							return (
								<TouchableWithoutFeedback
									key={index}
									onPress={() => navigation.push("Movie", item)}
								>
									<View className="space-y-2 mb-4">
										<Image
											className="rounded-3xl"
											source={{
												uri: image185(item?.poster_path) || fallbackMoviePoster,
											}}
											style={{ width: width * 0.44, height: height * 0.3 }}
										/>
										<Text className="text-neutral-400 ml-1">
											{item?.title.length > 20
												? item?.title.slice(0, 20) + "..."
												: item?.title}
										</Text>
									</View>
								</TouchableWithoutFeedback>
							)
						})}
					</View>
				</ScrollView>
			) : (
				<View className="flex-row justify-center items-center h-1/2">
					<Image
						source={{ uri: fallbackMoviePoster }}
						className="h-56 w-56 rounded-lg"
					/>
				</View>
			)}
		</SafeAreaView>
	)
}
