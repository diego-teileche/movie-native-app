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

var { width, height } = Dimensions.get("window")
const ios = Platform.OS == "ios"
const topMargin = ios ? "" : "mt-3"

export default function MovieScreen() {
	const { params: item } = useRoute()
	const navigation = useNavigation()
	const [isFavorite, setIsFavorite] = useState(false)

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
		</ScrollView>
	)
}
