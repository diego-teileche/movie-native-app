import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen"
import MovieScreen from "./screens/MovieScreen"
import PersonScreen from "./screens/PersonScreen"

const Stack = createNativeStackNavigator()

function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Movie" component={MovieScreen} />
				<Stack.Screen name="Person" component={PersonScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
