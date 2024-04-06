import {
	View,
	Text,
	StatusBar,
	Platform,
	TouchableOpacity,
	ScrollView,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import {
	Bars3CenterLeftIcon,
	MagnifyingGlassIcon,
} from "react-native-heroicons/outline"
import { styles } from "../themes/index"
import { useNavigation } from "@react-navigation/native"
import TrendingMovies from "../components/trendingMovies"
import MovieList from "../components/movieList"
import Loading from "../components/Loading"

const ios = Platform.OS == "ios"

export default function HomeScreen() {
	const [trending, setTrending] = useState([1, 2, 3])
	const [upcoming, setUpcoming] = useState([1, 2, 3])
	const [topRated, setTopRated] = useState([1, 2, 3])
	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)

	return (
		<View className="flex-1 bg-neutral-800">
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={"light-content"}
			/>

			<SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
				<StatusBar style="light" />

				<View className="flex-row justify-between items-center mx-4 mt-3">
					<Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
					<Text className="text-white text-3xl font-bold">
						<Text style={styles.text}>M</Text>ovies
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Search")}>
						<MagnifyingGlassIcon size="30" strokeWidth={2} color={"white"} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			{loading ? (
				<Loading />
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 10 }}
				>
					<TrendingMovies data={trending} />

					<MovieList title="Upcoming" data={upcoming} />

					<MovieList title="Top Rated" data={topRated} />
				</ScrollView>
			)}
		</View>
	)
}
