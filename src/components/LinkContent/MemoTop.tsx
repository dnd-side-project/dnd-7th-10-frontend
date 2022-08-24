import React from 'react'
import styled from '@emotion/native'
import { Typo } from '../../styles/variable'
import { fontWithColor } from '../../styles/fonts'
import { flexWithAlign } from '../../styles/flexbox'

const MemoTopView = styled.View`
  ${flexWithAlign('center', 'space-between', 'row')}
  width: 100%;
  margin-bottom: 24px;
`

const MemoTitle = styled.Text`
  ${fontWithColor('BlueGray_4')}
  ${Typo.Heading3_600}
`

const MemoBtn = styled.TouchableOpacity``

const MemoIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-left: 12px;
`

const MemoTop = () => {
  return (
    <MemoTopView>
      <MemoTitle>메모</MemoTitle>
      <MemoBtn>
        <MemoIcon source={require('../../assets/images/plus.png')} />
      </MemoBtn>
    </MemoTopView>
  )
}

export default MemoTop
