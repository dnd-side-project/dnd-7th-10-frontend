import React, { useState } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import SetupTop from '../components/RemindingSetup/SetupTop'
import { backgroundWithColor } from '../styles/backgrounds'
import SetupPicker from '../components/RemindingSetup/SetupPicker'
import SetupContent from '../components/RemindingSetup/SetupContent'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IArticleSelected } from '../components/RemindingGather/GatherArticleList'
import api from '../lib/api'
import { useRecoilValue } from 'recoil'
import { fcmTokenAtom } from '../recoil/global'
import useToast, {
  createCheckToast,
  createWarnToast,
  ToastOffset
} from '../hooks/useToast'
import { RouterNavigationProps } from './Router'

const RemindingSetupView = styled.View`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const RemindingSetupScrollView = styled.ScrollView`
  flex: 1;
`

const RemindingSetupContent = styled.View``

let isLoading = false

const RemindingSetup = () => {
  const navigation = useNavigation<RouterNavigationProps>()
  const targetToken = useRecoilValue(fcmTokenAtom)
  const [scrollLock, setScrollLock] = useState<boolean>(false)
  const [isRemindOn, setIsRemindOff] = useState<boolean>(true)
  const [cron, setCron] = useState<string>('')
  const [articles, setArticles] = useState<IArticleSelected[]>([])
  const showToast = useToast()

  const onFocus = async () => {
    const gathers = await AsyncStorage.getItem('gather-selects')
    await AsyncStorage.setItem('gather-selects', '')
    if (gathers && gathers.length > 0) {
      const selectedArticles: IArticleSelected[] = JSON.parse(gathers)
      setArticles(() => selectedArticles)
    }
  }

  useFocusEffect(() => {
    onFocus()
  })

  const onSavePress = () => {
    const articleIds = articles.map(({ articleId }) => articleId)
    console.log(isRemindOn)
    console.log(cron)
    console.log(articleIds)
    console.log(targetToken)
    if (isLoading) {
      return
    }
    if (!targetToken) {
      showToast(
        createWarnToast(
          '푸시 토큰을 발급 받을 수 없습니다.',
          ToastOffset.BottomTab
        )
      )
    }
    isLoading = true
    api
      .post('/quartz', {
        articleIds,
        cron,
        mode: isRemindOn ? 'add' : 'delete',
        targetToken
      })
      .then(response => {
        if (response.status === 200) {
          showToast(
            createCheckToast(
              '리마인드 알림을 생성했습니다.',
              ToastOffset.BottomTab
            )
          )
          navigation.goBack()
        } else {
          showToast(
            createWarnToast(
              '리마인드 알림을 생성할 수 없습니다.',
              ToastOffset.BottomTab
            )
          )
        }
      })
      .catch(() => {
        showToast(
          createWarnToast(
            '리마인드 알림을 생성할 수 없습니다.',
            ToastOffset.BottomTab
          )
        )
      })
      .finally(() => (isLoading = false))
  }

  return (
    <RemindingSetupView>
      <Header save onSavePress={onSavePress}>
        알림 설정
      </Header>
      <RemindingSetupScrollView scrollEnabled={!scrollLock}>
        <RemindingSetupContent>
          <SetupTop isRemindOn={isRemindOn} setIsRemindOn={setIsRemindOff} />
          <SetupPicker onScrollChange={setScrollLock} onCronChange={setCron} />
          <SetupContent articles={articles} />
        </RemindingSetupContent>
      </RemindingSetupScrollView>
    </RemindingSetupView>
  )
}

export default RemindingSetup
