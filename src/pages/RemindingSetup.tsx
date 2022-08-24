import React, { useState } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import SetupTop from '../components/RemindingSetup/SetupTop'
import { backgroundWithColor } from '../styles/backgrounds'
import SetupPicker from '../components/RemindingSetup/SetupPicker'
import SetupContent from '../components/RemindingSetup/SetupContent'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IArticleSelected } from '../components/RemindingGather/GatherArticleList'

const RemindingSetupView = styled.View`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const RemindingSetupScrollView = styled.ScrollView`
  flex: 1;
`

const RemindingSetupContent = styled.View``

const RemindingSetup = () => {
  const [scrollLock, setScrollLock] = useState<boolean>(false)
  const [isRemindOn, setIsRemindOff] = useState<boolean>(true)
  const [cron, setCron] = useState<string>('')
  const [articles, setArticles] = useState<IArticleSelected[]>([])

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
