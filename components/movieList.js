import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native"
import React from "react"
import { styles } from "../themes/index"
import { useNavigation } from "@react-navigation/native"

export default function MovieList({ title, data }) {
	let movieName = "Aguante Diegooooooooooooooooooooooo"
	const navigation = useNavigation()

	return (
		<View className="mb-8 space-y-4">
			<View className="mx-4 flex-row justify-between items-center">
				<Text className="text-white text-xl">{title}</Text>
				<TouchableOpacity>
					<Text style={styles.text} className="text-lg">
						See All
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{data.map((item, index) => {
					return (
						<TouchableWithoutFeedback
							key={index}
							onPress={() => navigation.navigate("Movie", item)}
						>
							<Text className="text-neutral-300 ml-1">{movieName}</Text>
						</TouchableWithoutFeedback>
					)
				})}
			</ScrollView>
		</View>
	)
}
