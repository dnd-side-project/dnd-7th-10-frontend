import React, { useEffect, useState } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import MemoCard from '../components/Remind/MemoCard'
import { IMemo } from '../components/Remind/MemoCard'
import { ScrollView, TouchableOpacity } from 'react-native'
import api from '../lib/api'
import { useRoute, useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../pages/Router'

const MemoMainView = styled.View`
  background-color: #f5f5f5;
`
const MemosView = styled.View`
  width: 366px;
  left: 12px;
`
interface MemoList extends Array<IMemo> {}
// const memo1 = {
//   id: '62c8f540-5dea-484b-969e-2ec47f7271be',
//   content: 'string',
//   registerDate: '2022-08-21T17:15:00.506413',
//   modifiedDate: '2022-08-21T17:15:00.506413',
//   openGraph: {
//     linkTitle: 'Google',
//     linkDescription: '',
//     linkImage: ''
//   },
//   folderTitle: '기본 폴더'
// }

const MemoMain = () => {
  const route = useRoute()
  const [memos, setMemos] = useState<MemoList>()
  const navigation = useNavigation<RouterNavigationProps>()

  const getMemos = () => {
    api
      .get<MemoList>('/memos')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
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
    if (route.name === 'MemoMain') {
      getMemos()
    }
  }, [route.name])

  const onCardPress = (memo: IMemo) => {
    navigation.navigate('MemoPage', { memo })
  }

  return (
    <MemoMainView>
      <ScrollView scrollEnabled={true}>
        <Header>메모 모음</Header>
        <MemosView>
          {memos?.map((memo, idx) => (
            <TouchableOpacity key={idx} onPress={() => onCardPress(memo)}>
              <MemoCard memo={memo} main key={idx} />
            </TouchableOpacity>
          ))}
        </MemosView>
      </ScrollView>
    </MemoMainView>
  )
}

export default MemoMain
