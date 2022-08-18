import React from 'react'
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
const HOURS = get2DigitSequence(24, 1)
const MINUTES = get2DigitSequence(60, 0)

const TimePicker = () => {
  return (
    <TimePickerView>
      <Select options={AMPM} />
      <TimeDivideText />
      <Select options={HOURS} />
      <TimeDivideText>:</TimeDivideText>
      <Select options={MINUTES} />
    </TimePickerView>
  )
}

export default TimePicker
