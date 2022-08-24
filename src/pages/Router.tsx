import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Modal from '../components/Common/Modal'
import FolderAdd from './FolderAdd'
import FolderContent from './FolderContent'
import LinkAdd from './LinkAdd'
import Login from './Login'
import RemindMain from './RemindMain'
import MemoMain from './MemoMain'
import MemoPage from './MemoPage'
import Main from './Main'
import { IMemo } from '../components/Remind/MemoCard'
import LinkContents from './LinkContents'

const Stack = createNativeStackNavigator<RouterParamList>()

export interface RouterParamList extends ParamListBase {
  Login: undefined
  Main: undefined
  LinkAdd:
    | {
        folderId?: string
      }
    | undefined
  FolderAdd: undefined
  FolderContent: {
    folderId: string
  }

  MemoPage: {
    memo: IMemo
  }

  LinkContents: {
    articleId: string
  }
}

export type RouterNavigationProps = NavigationProp<RouterParamList>

const Router = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="FolderAdd" component={FolderAdd} />
        <Stack.Screen name="LinkAdd" component={LinkAdd} />
        <Stack.Screen name="FolderContent" component={FolderContent} />
        <Stack.Screen name="RemindMain" component={RemindMain} />
        <Stack.Screen name="MemoMain" component={MemoMain} />
        <Stack.Screen name="MemoPage" component={MemoPage} />
        <Stack.Screen name="LinkContents" component={LinkContents} />
      </Stack.Navigator>
      <Modal />
    </>
  )
}

export default Router
