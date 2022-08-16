import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import FolderAdd from './FolderAdd'
import Login from './Login'
import Main from './Main'

const Stack = createNativeStackNavigator<RouterParamList>()

export interface RouterParamList extends ParamListBase {
  Login: undefined
  Main: undefined
  FolderAdd: undefined
}

export type RouterNavigationProps = NavigationProp<RouterParamList>

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="FolderAdd" component={FolderAdd} />
    </Stack.Navigator>
  )
}

export default Router
