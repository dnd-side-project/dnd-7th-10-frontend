import React from 'react'
import styled from '@emotion/native'
import { flexWithAlign } from '../../styles/flexbox'
import { fontWithColor } from '../../styles/fonts'
import { backgroundWithColor } from '../../styles/backgrounds'
import { ColorPalette } from '../../styles/variable'
import { Pressable } from 'react-native'

const DayPickerView = styled.View`
  ${flexWithAlign('center', 'center', 'row')}
`

interface DayProps {
  selected?: boolean
}

const DayItem = styled.View<DayProps>`
  ${props =>
    backgroundWithColor(props.selected ? 'LinkkleBlueGray' : 'background_2')}
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin: 0 4px;
  border: 1px solid ${ColorPalette.LinkkleLightBlueGray};
  ${props => props.selected && 'border: none'}
`

const DayText = styled.Text<DayProps>`
  ${props => fontWithColor(props.selected ? 'White' : 'BlueGray_3')}
  text-align: center;
  line-height: 40px;
`

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

const DayPicker = () => {
  const onPress = () => {}

  return (
    <DayPickerView>
      {DAYS.map(day => (
        <Pressable key={day} onPress={() => onPress()}>
          <DayItem>
            <DayText>{day}</DayText>
          </DayItem>
        </Pressable>
      ))}
    </DayPickerView>
  )
}

export default DayPicker
