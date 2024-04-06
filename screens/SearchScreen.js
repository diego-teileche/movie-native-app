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
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"
import Loading from "../components/Loading"

var { width, height } = Dimensions.get("window")

export default function SearchScreen() {
	const navigation = useNavigation()
	const [results, setResults] = useState([1, 2, 3, 4])
	const [loading, setLoading] = useState(false)
	let movieName = "Diegoooooooooooooooooooooo"

	return (
		<SafeAreaView className="bg-neutral-800 flex-1">
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={"light-content"}
			/>

			<View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
				<TextInput
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
											source={require("../assets/images/girl.jpeg")}
											style={{ width: width * 0.44, height: height * 0.3 }}
										/>
										<Text className="text-neutral-400 ml-1">
											{movieName.length > 20
												? movieName.slice(0, 20) + "..."
												: movieName}
										</Text>
									</View>
								</TouchableWithoutFeedback>
							)
						})}
					</View>
				</ScrollView>
			) : (
				<View className="flex-row justify-center">
					<Image
						source={require("../assets/images/girl.jpeg")}
						className="h-96 w-96"
					/>
				</View>
			)}
		</SafeAreaView>
	)
}
