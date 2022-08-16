import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import TabBar from '../components/Common/TabBar'
import FolderContent from './FolderContent'
import Home from './Home'

const Tab = createBottomTabNavigator()

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Reminding" component={FolderContent} />
      <Tab.Screen name="LinkAdd" component={Home} />
    </Tab.Navigator>
  )
}

export default Main
