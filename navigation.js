import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen"
import MovieScreen from "./screens/MovieScreen"

const Stack = createNativeStackNavigator()

function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Movie" component={MovieScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
