import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import { ScrollView } from 'react-native'
import { IIconButton } from '../components/Common/Header'
import { ColorPalette, Typo } from '../styles/variable'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'

const MemoMainView = styled.View`
  background-color: #f5f5f5;
`

const MemoCardsView = styled.View`
  display: flex;
  align-items: flex-start;
  padding-top: 24px;

  width: 414px;

  background: #ffffff;

  flex: none;
  order: 0;
  flex-grow: 0;
`

const MemoContent = styled.Text`
  color: ${ColorPalette.BlueGray_5};
  font-family: ${Typo.Body2_600};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
`

const MemoCardView = styled.View`
  box-sizing: border-box;
  padding: 16px;
  margin-left: 12px;
  width: 366px;
  height: 320px;
  background-color: ${ColorPalette.Background_1};
  border: 1px solid #d6e1ed;
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
`
const UrlView = styled.View`
  height: 98px;
  width: 414px;
  border-radius: 0px;
  background: #ffffff;
  margin-top: 4px;
`

const UrlImg = styled.Image`
  position: absolute;
  left: 5.8%;
  right: 78.26%;
  top: 16.33%;
  bottom: 16.33%;

  border: 1px solid ${ColorPalette.BlueGray_2}
  border-radius: 38px;
`
const UrlFolder = styled.Text`
  position: absolute;
  left: 25.6%;
  right: 67.15%;
  top: 16.33%;
  bottom: 65.31%;

  font-family: ${Typo.Detail2_400}
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.6px;

  color: ${ColorPalette.BlueGray_4};
`

const UrlTitleComponent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  position: absolute;
  width: 236px;
  height: 27px;
  left: 106px;
  top: 34px;
`
const UrlTitle = styled.Text`
  width: 65px;
  height: 27px;
  font-family: ${Typo.Heading3_600}
  font-size: 18px;
  line-height: 27px;

  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4}
`
const UrlDate = styled.Text`
  position: absolute;
  left: 25.6%;
  top: 70.41%;
  bottom: 11.22%;

  font-family: ${Typo.Detail2_400}
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_3}
`

const iconButtons: IIconButton[] = [
  {
    name: 'trash',
    source: require('../assets/images/trash.png')
  },
  {
    name: 'edit',
    source: require('../assets/images/icon_edit.png')
  }
]

const MemoPage = ({
  route
}: NativeStackScreenProps<RouterParamList, 'MemoPage'>) => {
  const { memo } = route.params
  console.log(memo)
  const { content, folderTitle, openGraph, registerDate } = memo
  const { linkTitle, linkImage } = openGraph
  const date = registerDate.split('T')[0]

  return (
    <MemoMainView>
      <ScrollView scrollEnabled={true}>
        <Header iconButtons={iconButtons}>메모</Header>
        <MemoCardsView>
          <MemoCardView>
            <MemoContent>{content}</MemoContent>
          </MemoCardView>
          <UrlView>
            <UrlImg
              source={{
                uri: linkImage ? linkImage : 'https://via.placeholder.com/16x16'
              }}
            />
            <UrlFolder>{folderTitle}</UrlFolder>
            <UrlTitleComponent>
              <UrlTitle>{linkTitle}</UrlTitle>
            </UrlTitleComponent>
            <UrlDate>{date}</UrlDate>
          </UrlView>
        </MemoCardsView>
      </ScrollView>
    </MemoMainView>
  )
}

export default MemoPage
