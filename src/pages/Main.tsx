import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import TabBar from '../components/Common/TabBar'
import Home from './Home'
import RemindMain from './RemindMain'

const Tab = createBottomTabNavigator()

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Reminding" component={RemindMain} />
      <Tab.Screen name="LinkAdd" component={Home} />
    </Tab.Navigator>
  )
}

export default Main
