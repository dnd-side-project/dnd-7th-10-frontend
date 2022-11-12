import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import TabBar from '../components/Common/TabBar'
import { noticeAtom } from '../recoil/global'
import Home from './Home'
import RemindMain from './RemindMain'
import { RouterParamList } from './Router'

const Tab = createBottomTabNavigator()

const Main = ({ navigation }: NativeStackScreenProps<RouterParamList>) => {
  const notice = useRecoilValue(noticeAtom)

  useEffect(() => {
    if (notice) {
      navigation.navigate('RemindingNotice', notice)
    }
  }, [notice])
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
