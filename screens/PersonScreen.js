import {
	View,
	Text,
	Dimensions,
	Platform,
	ScrollView,
	TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { useNavigation } from "@react-navigation/native"
import { styles, theme } from "../themes"

var { width, height } = Dimensions.get("window")
const ios = Platform.OS == "ios"
const verticalMargin = ios ? "" : " my-3"

export default function PersonScreen() {
	const navigation = useNavigation()
	const [isFavorite, setIsFavorite] = useState(false)

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
		</ScrollView>
	)
}
