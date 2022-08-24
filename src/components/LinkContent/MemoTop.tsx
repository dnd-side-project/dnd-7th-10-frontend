import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, FontFamily } from '../../styles/variable'

const MemoTopView = styled.View`
  width: 100%;
  margin-bottom: 24px;
  flex-direction: row;
  justify-content: space-between;
`

const MemoTitle = styled.Text`
  font-family: ${FontFamily.Regular};
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: flex-end;
  color: ${ColorPalette.gray_8};
`

const MemoBtn = styled.TouchableOpacity``

const MemoIcon = styled.Image`
  width: 24px;
  height: 24px;
`

const MemoTop = () => {
  return (
    <MemoTopView>
      <MemoTitle>메모</MemoTitle>
      <MemoBtn>
        <MemoIcon source={require('../../assets/images/icon_+.png')} />
      </MemoBtn>
    </MemoTopView>
  )
}

export default MemoTop
