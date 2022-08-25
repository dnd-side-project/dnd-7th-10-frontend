import React, { useCallback, useState } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import { IIconButton } from '../components/Common/Header'
import RemindingList from '../components/Remind/RemindingList'
import Notice from '../components/Remind/Notice'
import MemoCollection from '../components/Remind/MemoCollection'
import { ILink } from '../components/Remind/LinkCard'
import { IMemo } from '../components/Remind/MemoCard'
import { ScrollView } from 'react-native'
import api from '../lib/api'
import {
  useNavigation,
  useFocusEffect,
  useRoute
} from '@react-navigation/native'
import { RouterNavigationProps } from './Router'

const RemindingView = styled.View`
  background-color: #f5f5f5;
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
  const route = useRoute()

  const getArticles = () => {
    api
      .get<LinkList>('/articles')
      .then(response => {
        if (response.status === 200) {
          let resArr = Array.from(response.data)
          console.log(resArr)
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
          console.log(resArr)
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
    navigation.navigate('RemindingGather')
  }

  const onMemoPress = () => {
    navigation.navigate('MemoMain')
  }

  return (
    <RemindingView>
      <ScrollView scrollEnabled={true}>
        <Header iconButtons={iconButtons}>리마인딩</Header>
        <RemindingList list={list ? list : []} onPress={onRemindPress} />
        <Notice />
        <MemoCollection onPress={onMemoPress} memos={memos ? memos : []} />
      </ScrollView>
    </RemindingView>
  )
}

export default RemindMain
