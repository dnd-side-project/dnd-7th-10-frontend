import React, { useEffect, useState } from 'react'
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
import { useNavigation, useRoute } from '@react-navigation/native'
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

// const memos = [
//   {
//     id: '62c8f540-5dea-484b-969e-2ec47f7271be',
//     content: 'string',
//     registerDate: '2022-08-21T17:15:00.506413',
//     modifiedDate: '2022-08-21T17:15:00.506413',
//     openGraph: {
//       linkTitle: 'Google',
//       linkDescription: '',
//       linkImage: ''
//     },
//     folderTitle: '기본 폴더'
//   },
//   {
//     id: '0a7293bf-c227-4e29-afcc-5b7b98d20888',
//     content: 'content1',
//     registerDate: '2022-08-21T17:15:07.648693',
//     modifiedDate: '2022-08-21T17:15:07.648693',
//     openGraph: {
//       linkTitle: 'Google',
//       linkDescription: '',
//       linkImage: ''
//     },
//     folderTitle: '기본 폴더'
//   }
// ]

const RemindMain = () => {
  const navigation = useNavigation<RouterNavigationProps>()
  const route = useRoute()
  const [list, setList] = useState<LinkList>()
  const [memos, setMemos] = useState<MemoList>()

  const getArticles = () => {
    api
      .get<LinkList>('/articles')
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
          console.log(typeof response.data)
          let resArr = Array.from(response.data)
          console.log(Array.isArray(resArr))
          setMemos(resArr)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (route.name === 'Reminding') {
      getArticles()
      getMemos()
    }
  }, [route.name])

  const onMemoPress = () => {
    navigation.navigate('MemoMain')
  }

  return (
    <RemindingView>
      <ScrollView scrollEnabled={true}>
        <Header iconButtons={iconButtons}>리마인딩</Header>
        <RemindingList list={list ? list : []} />
        <Notice />
        <MemoCollection onPress={onMemoPress} memos={memos ? memos : []} />
      </ScrollView>
    </RemindingView>
  )
}

export default RemindMain
