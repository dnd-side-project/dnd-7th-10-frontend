import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'

type ViewProps = {
  main: boolean
}

const MemoCardView = styled.View<ViewProps>`
  width: ${props => (props.main === true ? '366px' : '200px')};
  height: ${props => (props.main === true ? '288px' : '312px')};
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
  border: ${props => (props.main === true ? '2px solid #DEEBF5' : 'none')};
  border-radius: ${props => (props.main === true ? '4px' : '8px')};
  margin-top: ${props => (props.main === true ? '16px' : '0px')};
  margin-right: ${props => (props.main === true ? '16px' : '16px')};
`
const MemoCardDate = styled.Text`
  position: absolute;
  width: 60px;
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
  overflow: hidden;
`
const UrlImg = styled.Image`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 16px;
  border-radius: 38px;
`

const UrlView = styled.View<ViewProps>`
  height: 72px;
  width: ${props => (props.main === true ? '334px' : '168px')};
  position: absolute;
  top: ${props => (props.main === true ? '216px' : '240px')};
  left: 16px;
  border-top-width: 1px;
  border-top-color: #deebf5;
`
const UrlFolder = styled.Text<ViewProps>`
  position: absolute;
  width: ${props => (props.main === true ? '286px' : '30px')};
  height: 18px
  left: ${props => (props.main === true ? '64px' : '48px')};
  bottom:${props => (props.main === true ? '38px' : '22px')};

  font-family: ${Typo.Detail2_400}
  font-size: 12px;
  line-height: 18px;
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

export interface IMemo {
  id?: string
  content?: string
  registerDate: string
  modifiedDate: string
  openGraph: {
    linkTitle?: string
    linkDescription?: string
    linkImage?: string
  }
  folderTitle?: string
}

interface Props {
  memo: IMemo
  main: boolean
}

const MemoCard = ({ memo, main }: Props) => {
  const { content, modifiedDate, folderTitle, openGraph } = memo
  const date = modifiedDate.split('T')[0]
  const { linkImage, linkTitle } = openGraph

  return (
    <MemoCardView main={main}>
      <MemoIcon source={require('../../assets/images/memo.png')} />
      <MemoCardDate>{date}</MemoCardDate>
      <MemoCardText>{content}</MemoCardText>
      <UrlView main={main}>
        <UrlImg
          source={{
            uri: linkImage ? linkImage : 'https://via.placeholder.com/16x16'
          }}
        />
        <UrlFolder main>{folderTitle}</UrlFolder>
        <UrlTitle>{linkTitle}</UrlTitle>
      </UrlView>
    </MemoCardView>
  )
}

export default MemoCard
