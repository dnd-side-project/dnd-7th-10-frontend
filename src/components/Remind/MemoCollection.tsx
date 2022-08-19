import React from 'react'
import styled from '@emotion/native'
import MemoCard from './MemoCard'
import { ColorPalette, Typo } from '../../styles/variable'

const MemoCollectionView = styled.View`
  background-color: #ffffff;
  width: 414px;
  height: 438px;
  flex: none;
  flex-grow: 0;
`
const TopText = styled.Text`
  position: absolute;
  left: 24px;
  top: 22px;
  width: 113px;
  height: 27px;
  font-family:${Typo.Heading3_600}
  font-size: 18px;
  line-height: 27px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color:${ColorPalette.BlueGray_4}
`

const MemoView = styled.View`
  position: absolute;
  width: 632px;
  height: 300px;
  left: 24px;
  top: 72px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const MemoCollection = () => {
  return (
    <MemoCollectionView>
      <TopText>최근 작성한 메모</TopText>
      <MemoView>
        <MemoCard />
        <MemoCard />
        <MemoCard />
      </MemoView>
    </MemoCollectionView>
  )
}

export default MemoCollection
