import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { League } from "./football/League";
import { FixturesByLeague } from "./football/FixturesByLeague";



const Stack = createStackNavigator()
export const Football = () => {
  return (
      <Stack.Navigator initialRouteName="League"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="League" component={League} />
        <Stack.Screen name="FixturesByLeague" component={FixturesByLeague} />
      </Stack.Navigator>
  )
};
