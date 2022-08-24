import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/native'
import { flexWithAlign } from '../../styles/flexbox'
import Select from './Select'
import { fontWithColor } from '../../styles/fonts'
import { Typo } from '../../styles/variable'

const TimePickerView = styled.View`
  ${flexWithAlign('center', 'center', 'row')}
`

const TimeDivideText = styled.Text`
  ${fontWithColor('BlueGray_5')}
  ${Typo.Alarm1_600}
  width: 10px;
  height: 38px;
  line-height: 38px;
  text-align: center;
`

function get2DigitSequence(count: number, fill: number) {
  const map = new Array(count).fill(fill).map((i, e) => i + e)
  return map.map(item => (item < 10 ? '0' + item : item))
}

const AMPM = ['AM', 'PM']
const HOURS = get2DigitSequence(12, 1)
const MINUTES = get2DigitSequence(60, 0)

export type ITime = [number, number]

interface Props {
  onChange?: (time: ITime) => void
}

const TimePicker = ({ onChange }: Props) => {
  const [ampm, setAmpm] = useState<string>('AM')
  const [hour, setHour] = useState<string>('01')
  const [minute, setMinute] = useState<string>('00')

  const time = useMemo(() => {
    const remindHour = (parseInt(hour, 10) + (ampm === 'PM' ? 12 : 0)) % 24
    const remindMinute = parseInt(minute, 10)
    const newtime: ITime = [remindHour, remindMinute]
    return newtime
  }, [hour, minute, ampm])

  useEffect(() => {
    if (onChange) {
      onChange(time)
    }
  }, [time, onChange])

  return (
    <TimePickerView>
      <Select options={AMPM} onChange={setAmpm} />
      <TimeDivideText />
      <Select options={HOURS} onChange={setHour} />
      <TimeDivideText>:</TimeDivideText>
      <Select options={MINUTES} onChange={setMinute} />
    </TimePickerView>
  )
}

export default TimePicker
