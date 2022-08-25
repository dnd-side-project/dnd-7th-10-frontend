import React, { useState, useEffect } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import MemoCard from '../components/Remind/MemoCard'
import { ScrollView, TouchableOpacity } from 'react-native'
import api from '../lib/api'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { RouterNavigationProps } from '../pages/Router'
import { IMemo } from '../components/Remind/MemoCard'

const MemoMainView = styled.View`
  background-color: #f5f5f5;
`
const MemosView = styled.View`
  width: 366px;
  left: 23px;
`
interface MemoList extends Array<IMemo> {}

const MemoMain = () => {
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

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getMemos()
    }
  }, [isFocused])

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
