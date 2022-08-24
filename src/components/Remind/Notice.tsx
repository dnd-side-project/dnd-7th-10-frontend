import React from 'react'
import styled from '@emotion/native'
import AlarmCard from './AlarmCard'
import { ColorPalette, Typo } from '../../styles/variable'
import { useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../../pages/Router'

const NoticeView = styled.View`
  background-color: #ffffff;
  width: 414px;
  height: 276px;
  margin-bottom: 4px;
`
const TopView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const TopText = styled.Text`
  width: 95px;
  height: 27px;
  left: 24px;
  top: 24px;
  color: ${ColorPalette.BlueGray_4};
  font-family: ${Typo.Heading3_600};
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
`
const AlarmCardBar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  position: absolute;
  width: 632px;
  height: 300px;
  left: 24px;
  top: 72px;
`
const AddIconBtn = styled.TouchableOpacity`
  position: absolute;
  height: 24px;
  width: 24px;
  left: 366px;
  top: 24px;
  border-radius: 0px;
`
const AddIcon = styled.Image`
  height: 24px;
  width: 24px;
`

const Notice = () => {
  const navigation = useNavigation<RouterNavigationProps>()

  const onAddPress = () => {
    navigation.navigate('RemindingSetup')
  }

  return (
    <NoticeView>
      <TopView>
        <TopText>리마인딩 알림</TopText>
        <AddIconBtn onPress={onAddPress}>
          <AddIcon
            source={require('../../assets/images/plus.png')}
            resizeMode="contain"
          />
        </AddIconBtn>
      </TopView>
      <AlarmCardBar>
        <AlarmCard />
        <AlarmCard />
      </AlarmCardBar>
    </NoticeView>
  )
}

export default Notice
