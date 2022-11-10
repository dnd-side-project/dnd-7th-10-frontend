import {
  NavigationProp,
  ParamListBase,
  useNavigation
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import Modal from '../components/Common/Modal'
import FolderAdd from './FolderAdd'
import FolderContent from './FolderContent'
import LinkAdd from './LinkAdd'
import Login from './Login'
import RemindMain from './RemindMain'
import MemoMain from './MemoMain'
import MemoPage from './MemoPage'
import Main from './Main'
import LinkContents from './LinkContents'
import RemindingSetup from './RemindingSetup'
import RemindingGather from './RemindingGather'
import AddMemoPage from './AddMemoPage'
import Browser from './Browser'
import RemindingNotice from './RemindingNotice'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { noticeAtom, quicklinkAtom, quicklinkLastAtom } from '../recoil/global'
import RemindingListPage from './RemindingListPage'
import LinkEdit from './LinkEdit'
import { IArticle, IMemo } from '../recoil/folders'
import { AppState, AppStateStatus } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { isValidUrl } from '../lib/urlcheck'
import useFolderList from '../components/Home/FolderList.hook'
import FolderEdit from './FolderEdit'
import RemindingDetail from './RemindingDetail'
import { IRemind } from '../components/Remind/Notice'

const Stack = createNativeStackNavigator<RouterParamList>()

export interface INoticeData {
  articleId: string
  remindId: string
}

export interface RouterParamList extends ParamListBase {
  Login: undefined
  Main: undefined
  LinkAdd:
    | {
        folderId?: string
        linkUrl?: string
      }
    | undefined
  LinkEdit: {
    articleId: string
  }
  FolderAdd: undefined
  FolderEdit: {
    folderId: string
  }
  FolderContent: {
    folderId: string
  }
  MemoPage: {
    memo: IMemo
  }

  LinkContents: {
    articleId: string
  }
  RemindingSetup:
    | {
        remindId: string
      }
    | undefined
  RemindingGather:
    | {
        remindId: string
      }
    | undefined

  Browser:
    | {
        url: string
        articleId: string
        readable?: boolean
      }
    | undefined

  RemindingNotice: INoticeData
  RemindingDetail: {
    remind: IRemind
  }
  RemindingList: undefined
  AddMemoPage: {
    article?: IArticle
  }
}

export type RouterNavigationProps = NavigationProp<RouterParamList>

const Router = () => {
  const [notice, setNotice] = useRecoilState(noticeAtom)
  const navigation = useNavigation<RouterNavigationProps>()
  const [last, setLast] = useRecoilState(quicklinkLastAtom)
  const [folderIds] = useFolderList()
  const setQuicklink = useSetRecoilState(quicklinkAtom)

  useEffect(() => {
    if (notice) {
      if (navigation.getState()) {
        navigation.navigate('RemindingNotice', notice)
      }
    }
  }, [notice, setNotice, navigation])

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )
    return () => {
      subscription.remove()
    }
  }, [last])

  const handleAppStateChange = (appState: AppStateStatus) => {
    if (appState === 'active') {
      Clipboard.getString()
        .then(copiedText => {
          if (isValidUrl(copiedText) && last !== copiedText) {
            if (folderIds.length > 0) {
              setQuicklink({
                linkUrl: copiedText,
                folderId: folderIds[0]
              })
              setLast(copiedText)
            }
          }
        })
        .catch(() => {
          console.error('failed to fetch copied text')
        })
    }
  }

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="FolderAdd" component={FolderAdd} />
        <Stack.Screen name="FolderEdit" component={FolderEdit} />
        <Stack.Screen name="LinkAdd" component={LinkAdd} />
        <Stack.Screen name="FolderContent" component={FolderContent} />
        <Stack.Screen name="RemindMain" component={RemindMain} />
        <Stack.Screen name="MemoMain" component={MemoMain} />
        <Stack.Screen name="MemoPage" component={MemoPage} />
        <Stack.Screen name="AddMemoPage" component={AddMemoPage} />
        <Stack.Screen name="LinkContents" component={LinkContents} />
        <Stack.Screen name="RemindingSetup" component={RemindingSetup} />
        <Stack.Screen name="RemindingGather" component={RemindingGather} />
        <Stack.Screen name="RemindingNotice" component={RemindingNotice} />
        <Stack.Screen name="RemindingList" component={RemindingListPage} />
        <Stack.Screen name="RemindingDetail" component={RemindingDetail} />
        <Stack.Screen name="Browser" component={Browser} />
        <Stack.Screen name="LinkEdit" component={LinkEdit} />
      </Stack.Navigator>
      <Modal />
    </>
  )
}

export default Router
