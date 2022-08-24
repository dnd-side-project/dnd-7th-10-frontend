import React from 'react'
import styled from '@emotion/native'
import { Typo } from '../../styles/variable'
import { fontWithColor } from '../../styles/fonts'
import Switch from '../Common/Switch'
import { backgroundWithColor } from '../../styles/backgrounds'

const SetupTopView = styled.View`
  ${backgroundWithColor('White')}
  padding: 24px;
  height: 100px;
`

const SetupTopTitle = styled.Text`
  ${Typo.Heading3_600}
  ${fontWithColor('BlueGray_4')}
`

const SetupTopDescription = styled.Text`
  ${Typo.Body2_600}
  ${fontWithColor('BlueGray_4')}
`

const SetupSwitch = styled.View`
  position: absolute;
  right: 24px;
  top: 28px;
`

interface Props {
  isRemindOn: boolean
  setIsRemindOn: (value: boolean) => void
}

const SetupTop = ({ isRemindOn, setIsRemindOn }: Props) => {
  return (
    <SetupTopView>
      <SetupTopTitle>리마인딩 알림을 받아보시겠어요?</SetupTopTitle>
      <SetupTopDescription>
        꾸준한 리마인딩을 위해 푸시알림을 보내드릴게요.
      </SetupTopDescription>
      <SetupSwitch>
        <Switch value={isRemindOn} onChange={setIsRemindOn} />
      </SetupSwitch>
    </SetupTopView>
  )
}

export default SetupTop
