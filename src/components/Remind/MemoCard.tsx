import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'

const MemoCardView = styled.View`
  width: 200px;
  height: 300px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-right: 16px;
`

const MemoCardDate = styled.Text`
  position: absolute;
  width: 56px;
  height: 14px;
  right: 16px;
  top: 16px;
  font-family: ${Typo.Detail2_400};
  color: ${ColorPalette.BlueGray_3};
`
const MemoCardText = styled.Text`
  position: absolute;
  width: 168px;
  height: 164px;
  left: 16px;
  top: 56px;

  font-family: ${Typo.Body2_600}
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.6px;

  color: ${ColorPalette.BlueGray_5};
`
const BottomImg = styled.Image`
  position: absolute;
  width: 40px;
  height: 40px;
  left: 16px;
  bottom: 16px;
  border-radius: 38px;
`
const UrlFolder = styled.Text`
  position: absolute;
  width: 72px;
  height: 14px;
  left: 64px;
  bottom: 42px;

  font-family: ${Typo.Detail2_400}
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.6px;
  color:${ColorPalette.BlueGray_3}
`
const UrlTitle = styled.Text`
  position: absolute;
  width: 120px;
  height: 24px;
  left: 64px;
  bottom: 16px;

  font-family: ${Typo.Heading4_600}
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4}
`

const MemoIcon = styled.Image`
  position: absolute;
  left: 8%;
  right: 80%;
  top: 5.33%;
  bottom: 86.67%;
  height: 24px;
  width: 24px;
  left: 16px;
  top: 16px;
  border-radius: 0px;
`

interface IMemo {
  content: string
  id: string
  modifiedDate: string
  registerDate: string
  article: {
    linkDescription: string
    linkImage: string
    linkTitle: string
  }
  folder: string
}

interface Props {
  memo: IMemo
}

const MemoCard = ({ memo }: Props) => {
  const { content, modifiedDate, folder, article } = memo
  const date = modifiedDate.split('T')[0]
  const { linkImage, linkTitle } = article
  return (
    <MemoCardView>
      <MemoIcon source={require('../../assets/images/memo.png')} />
      <MemoCardDate>{date}</MemoCardDate>
      <MemoCardText>{content}</MemoCardText>
      <BottomImg source={{ uri: linkImage }} />
      <UrlFolder>{folder}</UrlFolder>
      <UrlTitle>{linkTitle}</UrlTitle>
    </MemoCardView>
  )
}

export default MemoCard
