import React from 'react'
import styled from '@emotion/native'
import TimePicker from '../Common/TimePicker'
import DayPicker from '../Common/DayPicker'
import { backgroundWithColor } from '../../styles/backgrounds'

const SetupPickerView = styled.View`
  margin: 4px 0;
  ${backgroundWithColor('White')}
  padding: 24px;
`

const SetupPickerDivide = styled.View`
  height: 8px;
`

interface Props {
  onChange?: (value: boolean) => void
}

const SetupPicker = ({ onChange }: Props) => {
  const onStart = () => {
    if (onChange) {
      onChange(true)
    }
  }

  const onEnd = () => {
    if (onChange) {
      onChange(false)
    }
  }

  return (
    <SetupPickerView onTouchStart={onStart} onTouchEnd={onEnd}>
      <TimePicker />
      <SetupPickerDivide />
      <DayPicker />
    </SetupPickerView>
  )
}

export default SetupPicker
