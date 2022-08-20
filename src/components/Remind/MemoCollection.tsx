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

const RightArrow = styled.Image`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 366px;
  top: 24px;
`

const memos = [
  {
    content: 'string',
    id: 'string',
    modifiedDate: '2022-08-20T06:38:01.351Z',
    registerDate: '2022-08-20T06:38:01.351Z',
    article: {
      linkDescription: 'string',
      linkImage: 'https://via.placeholder.com/16x16',
      linkTitle: 'string'
    },
    folder: 'string'
  },
  {
    content: 'string',
    id: 'string',
    modifiedDate: '2022-08-19T06:38:01.351Z',
    registerDate: '2022-08-20T06:38:01.351Z',
    article: {
      linkDescription: 'string',
      linkImage: 'https://via.placeholder.com/16x16',
      linkTitle: 'string'
    },
    folder: 'string'
  }
]

const MemoCollection = () => {
  return (
    <MemoCollectionView>
      <TopText>최근 작성한 메모</TopText>
      <RightArrow source={require('../../assets/images/icon_more.png')} />
      <MemoView>
        {memos.map(memo => (
          <MemoCard memo={memo} />
        ))}
      </MemoView>
    </MemoCollectionView>
  )
}

export default MemoCollection
