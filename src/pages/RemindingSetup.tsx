import React, { useState } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import SetupTop from '../components/RemindingSetup/SetupTop'
import { backgroundWithColor } from '../styles/backgrounds'
import SetupPicker from '../components/RemindingSetup/SetupPicker'
import SetupContent from '../components/RemindingSetup/SetupContent'

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
  return (
    <RemindingSetupView>
      <Header save>알림 설정</Header>
      <RemindingSetupScrollView scrollEnabled={!scrollLock}>
        <RemindingSetupContent>
          <SetupTop />
          <SetupPicker onChange={setScrollLock} />
          <SetupContent />
        </RemindingSetupContent>
      </RemindingSetupScrollView>
    </RemindingSetupView>
  )
}

export default RemindingSetup
