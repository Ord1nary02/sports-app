import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Series } from './cricket/Series'
import { FixturesBySeries } from './cricket/FixturesBySeries'


const Stack = createStackNavigator()

export const Cricket = () => {
  return (
    <Stack.Navigator
      initialRouteName='Series'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Series" component={Series} />
      <Stack.Screen name = "FixturesBySeries" component={FixturesBySeries} />
    </Stack.Navigator>
  )
}
