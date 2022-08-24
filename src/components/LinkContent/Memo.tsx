import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import { fontWithColor } from '../../styles/fonts'

const MemoContent = styled.View`
  ${backgroundWithColor('White')}
  padding: 16px;
  border: 2px solid ${ColorPalette.LinkkleLightBlueGray};
  border-radius: 4px;
  margin-bottom: 8px;
`

const TopView = styled.View`
  ${flexWithAlign('flex-start', 'space-between', 'row')}
  height: 24px;
  margin-bottom: 16px;
`
const MemoDate = styled.Text`
  color: ${ColorPalette.gray_4};
`
const MemoText = styled.Text`
  ${fontWithColor('BlueGray_5')}
  ${Typo.Body2_600}
`

const MemoImage = styled.Image`
  width: 24px;
  height: 24px;
`
interface Props {
  content: string
}
//destructoring을 하고 있는 거기 때문에 {content:string}은 불가능
//{}객체 형태로

const Memo = ({ content }: Props) => {
  return (
    <MemoContent>
      <TopView>
        <MemoImage source={require('../../assets/images/icon_memo.png')} />
        <MemoDate>2022.08.13</MemoDate>
      </TopView>
      <MemoText>{content}</MemoText>
    </MemoContent>
  )
}

export default Memo
