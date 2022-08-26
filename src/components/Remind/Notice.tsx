import React, { useEffect, useState } from 'react'
import styled from '@emotion/native'
import AlarmCard from './AlarmCard'
import { ColorPalette, Typo } from '../../styles/variable'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../../pages/Router'
import api from '../../lib/api'
import { ILink } from './LinkCard'
import Empty from '../Common/Empty'

const NoticeView = styled.View`
  background-color: #ffffff;
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
const AlarmCardBar = styled.ScrollView`
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 200px;
  top: 72px;
  margin-left: 24px;
`

const AddIconBtn = styled.TouchableOpacity`
  position: absolute;
  height: 24px;
  width: 24px;
  right: 24px;
  top: 24px;
  border-radius: 0px;
`
const AddIcon = styled.Image`
  height: 24px;
  width: 24px;
`

interface LinkList extends Array<ILink> {}

export interface IRemind {
  filter(arg0: (el: any) => any): any
  remindId: string
  userId: string
  cron: string
  remindTitle: string
  articleList: LinkList
}

const Notice = () => {
  const navigation = useNavigation<RouterNavigationProps>()
  const [reminds, setReminds] = useState([])

  const onAddPress = () => {
    navigation.navigate('RemindingSetup')
  }

  const getReminds = () => {
    api
      .get<IRemind>('/remind')
      .then(response => {
        if (response.status === 200) {
          setReminds(response.data.filter(el => el.cron !== null))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      getReminds()
    }
  }, [])

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
      {reminds.length !== 0 ? (
        <AlarmCardBar horizontal={true}>
          {reminds.map((remind, idx) => (
            <AlarmCard remind={remind} key={idx} />
          ))}
        </AlarmCardBar>
      ) : (
        <Empty
          text={`알림이 설정되지 않았어요!${'\n'}꾸준한 리마인딩을 받아보세요.`}
          button
          buttonText="알림 추가하기"
          background="white"
          onButtonPress={onAddPress}
        />
      )}
    </NoticeView>
  )
}

export default Notice
