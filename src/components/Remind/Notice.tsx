import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/native'
import AlarmCard from './AlarmCard'
import { ColorPalette, Typo } from '../../styles/variable'
import {
  useFocusEffect,
  useIsFocused,
  useNavigation
} from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
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
  align-self: stretch;
  height: 60px;
  min-height: 30px;
`

const EmptyView = styled.View`
  height: 200px;
`
const TopText = styled.Text`
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
`

const AddIconBtn = styled.TouchableOpacity`
  /* position: absolute; */
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

const AlarmCardView = styled.View`
  padding: 0 16px;
  flex-direction: row;
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
  const [reminds, setReminds] = useState<IRemind[]>([])

  const onAddPress = () => {
    navigation.navigate('RemindingSetup')
  }

  const getReminds = useCallback(() => {
    console.log('refresh remind')
    api
      .get<IRemind>('/remind')
      .then(response => {
        if (response.status === 200) {
          setReminds(response.data.filter(el => el.cron !== null))
        }
      })
      .catch(err => {
        console.error(err)
      })
    setTimeout(() => {
      api
        .get<IRemind>('/remind')
        .then(response => {
          if (response.status === 200) {
            setReminds(response.data.filter(el => el.cron !== null))
          }
        })
        .catch(err => {
          console.error(err)
        })
    }, 3000)
  }, [setReminds])

  useFocusEffect(getReminds)

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      getReminds()
    }
  }, [])

  function handleAlarmPress(remind: IRemind) {
    navigation.navigate('RemindingDetail', { remind })
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
      {reminds.length !== 0 ? (
        <AlarmCardBar horizontal={true}>
          <AlarmCardView>
            {reminds.map((remind, idx) => (
              <TouchableOpacity
                onPress={() => handleAlarmPress(remind)}
                key={idx}
              >
                <AlarmCard remind={remind} />
              </TouchableOpacity>
            ))}
          </AlarmCardView>
        </AlarmCardBar>
      ) : (
        <EmptyView>
          <Empty
            text={`알림이 설정되지 않았어요!${'\n'}꾸준한 리마인딩을 받아보세요.`}
            button
            buttonText="알림 추가하기"
            background="White"
            onButtonPress={onAddPress}
          />
        </EmptyView>
      )}
    </NoticeView>
  )
}

export default Notice
