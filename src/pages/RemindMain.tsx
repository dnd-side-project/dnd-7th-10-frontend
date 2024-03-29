import React, { useCallback, useState } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import { IIconButton } from '../components/Common/Header'
import RemindingList from '../components/Remind/RemindingList'
import Notice from '../components/Remind/Notice'
import MemoCollection from '../components/Remind/MemoCollection'
import { ILink } from '../components/Remind/LinkCard'
import { ScrollView } from 'react-native'
import api from '../lib/api'
import {
  useNavigation,
  useFocusEffect,
  useRoute
} from '@react-navigation/native'
import { RouterNavigationProps } from './Router'
import { folderIdsAtom, IMemo } from '../recoil/folders'
import { useRecoilValue } from 'recoil'

const RemindingView = styled.View`
  background-color: #f5f5f5;
  flex: 1;
`

const iconButtons: IIconButton[] = [
  {
    name: 'alarm',
    source: require('../assets/images/bell.png')
  }
]

interface LinkList extends Array<ILink> {}
interface MemoList extends Array<IMemo> {}

const RemindMain = () => {
  const navigation = useNavigation<RouterNavigationProps>()
  const [list, setList] = useState<LinkList>()
  const [memos, setMemos] = useState<MemoList>()
  const folderIds = useRecoilValue(folderIdsAtom)
  const route = useRoute()

  const getArticles = () => {
    api
      .get<LinkList>('/articles/mark')
      .then(response => {
        if (response.status === 200) {
          let resArr = Array.from(response.data)

          setList(resArr)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  const getMemos = () => {
    api
      .get<MemoList>('/memos')
      .then(response => {
        if (response.status === 200) {
          let resArr = Array.from(response.data)
          setMemos(resArr)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  useFocusEffect(
    useCallback(() => {
      if (route.name === 'Reminding') {
        getArticles()
        getMemos()
      }
    }, [route.name])
  )

  const onRemindPress = () => {
    navigation.navigate('RemindingList')
  }

  const onEmptyPress = () => [
    navigation.navigate('FolderContent', {
      folderId: folderIds[0]
    })
  ]

  const onMemoPress = () => {
    navigation.navigate('MemoMain')
  }

  return (
    <RemindingView>
      <Header iconButtons={iconButtons}>리마인딩</Header>
      <ScrollView scrollEnabled={true}>
        <RemindingList
          list={list ? list : []}
          onPress={onRemindPress}
          onEmptyPress={onEmptyPress}
        />
        <Notice />
        <MemoCollection onPress={onMemoPress} memos={memos ? memos : []} />
      </ScrollView>
    </RemindingView>
  )
}

export default RemindMain
