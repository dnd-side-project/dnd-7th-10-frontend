import React, { useState, useEffect } from 'react'
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

export type IDay = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
]

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

const QUARTZ_DAYS = 'SUN,MON,TUE,WED,THU,FRI,SAT'.split(',')

interface Props {
  onChange: (cron: string) => void
  defaultCron?: string
}

const DAY_MAP = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일'
}
type DAY_MAP_KEY = keyof typeof DAY_MAP

const defaultDays: IDay = [false, false, false, false, false, false, false]

const DayPicker = ({ defaultCron, onChange }: Props) => {
  const [alreadySet, setAlreadySet] = useState<boolean>(false)
  const [days, setDays] = useState<IDay>(defaultDays)

  useEffect(() => {
    if (!alreadySet) {
      if (defaultCron && defaultCron !== '') {
        const indexes = defaultCron
          .split(' ')[5]
          .split(',')
          .map(day => {
            const dayText = DAY_MAP[day as DAY_MAP_KEY]
            const dayIndex = DAYS.indexOf(dayText)
            return dayIndex
          })
        onPress(...indexes)
      } else {
        const date = new Date()
        onPress(date.getDay())
      }
    }
    setAlreadySet(true)
  }, [alreadySet, defaultCron])

  const onPress = (...indexes: number[]) => {
    setDays(oldDays => {
      const newDays: IDay = [...oldDays]
      indexes.forEach(index => (newDays[index] = !newDays[index]))
      const cron = newDays
        .map((day, dayIndex) => (day ? dayIndex : -1))
        .filter(day => day > -1)
        .map(day => QUARTZ_DAYS[day])
        .join(',')
      if (onChange) {
        onChange(cron)
      }
      return newDays
    })
  }

  return (
    <DayPickerView>
      {DAYS.map((day, index) => (
        <Pressable key={day} onPress={() => onPress(index)}>
          <DayItem selected={days[index]}>
            <DayText selected={days[index]}>{day}</DayText>
          </DayItem>
        </Pressable>
      ))}
    </DayPickerView>
  )
}

export default DayPicker
