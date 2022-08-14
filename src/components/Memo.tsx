import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, FontFamily } from '../styles/variable'
import { Image } from 'react-native'

const MemoContent = styled.View`
  padding: 12px;
  height: 182px;
  background-color: ${ColorPalette['background_1']};
  border-radius: 5px;
  border: 1px solid ${ColorPalette['gray_4']};
`

const TopView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`
const MemoDate = styled.Text`
  color: ${ColorPalette['gray_4']};
`
const MemoText = styled.Text`
  font-family: ${FontFamily['Regular']};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: ${ColorPalette['gray_6']};
`

const Memo = ({ content }) => {
  return (
    <MemoContent>
      <TopView>
        <Image
          source={require('../assets/images/icon_memo.png')}
          style={{ width: 24, height: 24 }}
        />
        <MemoDate>2022.08.13</MemoDate>
      </TopView>
      <MemoText>{content}</MemoText>
    </MemoContent>
  )
}

export default Memo
