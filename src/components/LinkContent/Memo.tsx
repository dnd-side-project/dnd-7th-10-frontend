import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import { fontWithColor } from '../../styles/fonts'
import { IMemo } from '../../recoil/folders'

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
  memo: IMemo
}
//destructoring을 하고 있는 거기 때문에 {content:string}은 불가능
//{}객체 형태로

const Memo = ({ memo }: Props) => {
  return (
    <MemoContent>
      <TopView>
        <MemoImage source={require('../../assets/images/icon_memo.png')} />
        <MemoDate>{memo.registerDate}</MemoDate>
      </TopView>
      <MemoText>{memo.content}</MemoText>
    </MemoContent>
  )
}

export default Memo
