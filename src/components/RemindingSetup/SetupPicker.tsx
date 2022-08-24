import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/native'
import TimePicker, { ITime } from '../Common/TimePicker'
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
  onScrollChange?: (value: boolean) => void
  onCronChange?: (value: string) => void
}

const SetupPicker = ({ onScrollChange, onCronChange }: Props) => {
  const [time, setTime] = useState<ITime>([1, 0])
  const [days, setDays] = useState<string>('')

  const onStart = () => {
    if (onScrollChange) {
      onScrollChange(true)
    }
  }

  const onEnd = () => {
    if (onScrollChange) {
      onScrollChange(false)
    }
  }

  const cron = useMemo(() => {
    const [hour, minute] = time
    const expression = `0 ${minute} ${hour} ? * ${days || '*'} *`
    console.log(expression)
    return expression
  }, [time, days])

  useEffect(() => {
    if (onCronChange) {
      onCronChange(cron)
    }
  }, [cron, onCronChange])

  return (
    <SetupPickerView onTouchStart={onStart} onTouchEnd={onEnd}>
      <TimePicker onChange={setTime} />
      <SetupPickerDivide />
      <DayPicker onChange={setDays} />
    </SetupPickerView>
  )
}

export default SetupPicker
