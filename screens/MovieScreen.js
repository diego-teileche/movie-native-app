import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	Platform,
	Image,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useEffect, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { styles, theme } from "../themes/index"
import { LinearGradient } from "expo-linear-gradient"
import Cast from "../components/Cast"

var { width, height } = Dimensions.get("window")
const ios = Platform.OS == "ios"
const topMargin = ios ? "" : "mt-3"

export default function MovieScreen() {
	const movieName = "Aguante Diegooooooooooooooo"
	const { params: item } = useRoute()
	const navigation = useNavigation()
	const [isFavorite, setIsFavorite] = useState(false)
	const [cast, setCast] = useState([1, 2, 3, 4, 5])

	useEffect(() => {}, [item])

	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: 20 }}
			className="flex-1 bg-neutral-900"
		>
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

				<View>
					<Image
						source={require("../assets/images/girl.jpeg")}
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
			</View>

			<View className="space-y-3" style={{ marginTop: -(height * 0.09) }}>
				<Text className="text-white text-center text-3xl font-bold tracking-wider">
					{movieName}
				</Text>
				<Text className="text-neutral-400 font-semibold text-base text-center">
					Released - 2020 - 170 min
				</Text>

				<View className="flex-row justify-center mx-4 space-x-2">
					<Text className="text-neutral-400 font-semibold text-base text-center">
						Action -
					</Text>
					<Text className="text-neutral-400 font-semibold text-base text-center">
						Thrill -
					</Text>
					<Text className="text-neutral-400 font-semibold text-base text-center">
						Comedy
					</Text>
				</View>

				<Text
					className="text-black font-semibold mx-4 tracking-wide p-2 rounded-lg"
					style={styles.background}
				>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
					eveniet, similique eligendi voluptate nemo natus, temporibus
					consequatur tempore voluptatem error molestiae assumenda repellendus
					illo quasi ratione sit tempora ut mollitia possimus vel quas labore
					neque nulla. Nihil laboriosam deserunt magni.
				</Text>
			</View>

			<Cast navigation={navigation} cast={cast} />
		</ScrollView>
	)
}
