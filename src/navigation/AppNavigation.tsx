import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../views/Home";
import { Splash } from "../views/Splash";

const Stack = createStackNavigator();
export const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
  );
};
