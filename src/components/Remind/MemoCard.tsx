import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'
import { shadow } from '../../styles/backgrounds'

type ViewProps = {
  main: boolean
}

const MemoCardView = styled.View<ViewProps>`
  width: ${props => (props.main === true ? '100%' : '200px')};
  height: ${props => (props.main === true ? 'auto' : '312px')};
  background: #ffffff;
  box-shadow: ${shadow};
  border: ${props => (props.main === true ? '2px solid #DEEBF5' : 'none')};
  border-radius: ${props => (props.main === true ? '4px' : '8px')};
  margin-top: ${props => (props.main === true ? '16px' : '0px')};
  margin-right: 16px;
`
const MemoCardDate = styled.Text`
  position: absolute;
  width: 65px;
  height: 14px;
  right: 16px;
  top: 16px;
  font-family: ${Typo.Detail2_400};
  color: ${ColorPalette.BlueGray_3};
`
const MemoCardText = styled.Text<{ main?: boolean }>`
  width: ${props => (props.main ? '100%' : '168px')};
  padding: 16px;
  margin-top: 16px;

  font-family: ${Typo.Body2_600};
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.6px;

  color: ${ColorPalette.BlueGray_5};
  flex: 1;
`
const UrlImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 38px;
`

const UrlView = styled.View<ViewProps>`
  flex-direction: row;
  margin: auto 16px 0;
  align-items: center;
  height: 72px;
  width: ${props => (props.main === true ? 'auto' : '168px')};
  border-top-width: 1px;
  border-top-color: #deebf5;
`
const UrlFolder = styled.Text<ViewProps>`
  width: ${props => (props.main === true ? '100%' : '30px')};
  height: 18px;

  font-family: ${Typo.Detail2_400};
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_3};
`
const UrlTitle = styled.Text`
  height: 24px;

  font-family: ${Typo.Heading4_600};
  font-size: 16px;
  line-height: 24px;

  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4};
`

const MemoIcon = styled.Image`
  height: 24px;
  width: 24px;
  left: 16px;
  top: 16px;
`

const UrlTextView = styled.View`
  margin-left: 8px;
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
      <MemoCardText main={main}>{content}</MemoCardText>
      <UrlView main={main}>
        <UrlImg
          source={{
            uri: linkImage ? linkImage : 'https://via.placeholder.com/16x16'
          }}
        />
        <UrlTextView>
          <UrlFolder main>{folderTitle}</UrlFolder>
          <UrlTitle>{linkTitle}</UrlTitle>
        </UrlTextView>
      </UrlView>
    </MemoCardView>
  )
}

export default MemoCard
