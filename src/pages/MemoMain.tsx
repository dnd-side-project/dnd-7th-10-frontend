import React, { useState, useEffect } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import MemoCard from '../components/Remind/MemoCard'
import { ScrollView, TouchableOpacity } from 'react-native'
import api from '../lib/api'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { RouterNavigationProps } from '../pages/Router'
import { IMemo } from '../components/Remind/MemoCard'
import { backgroundWithColor } from '../styles/backgrounds'
import Empty from '../components/Common/Empty'

const MemoMainView = styled.View`
  background-color: #f5f5f5;
  flex: 1;
`
const MemosView = styled.View`
  ${backgroundWithColor('White')}
  padding: 8px 24px 24px;
  flex-grow: 1;
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
          //
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

  const containerStyle = {
    flexGrow: 1
  }

  return (
    <MemoMainView>
      <Header>메모 모음</Header>
      <ScrollView scrollEnabled={true} contentContainerStyle={containerStyle}>
        <MemosView>
          {memos?.map((memo, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => onCardPress(memo)}
              activeOpacity={0.9}
            >
              <MemoCard memo={memo} main key={idx} />
            </TouchableOpacity>
          ))}
          {memos?.length === 0 && (
            <Empty
              background="White"
              text={
                '작성한 메모가 없어요!\n새로 저장한 링크들에 메모를 써볼까요?'
              }
              icon
              source={require('../assets/images/memo.png')}
            />
          )}
        </MemosView>
      </ScrollView>
    </MemoMainView>
  )
}

export default MemoMain
