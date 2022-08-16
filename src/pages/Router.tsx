import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from './Login'
import Main from './Main'

const Stack = createNativeStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  )
}

export default Router
