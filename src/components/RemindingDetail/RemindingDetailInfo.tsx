import React, { useState, useEffect } from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'
import { backgroundWithColor } from '../../styles/backgrounds'

const DetailInfoView = styled.View`
  padding: 64px 0;
  align-items: center;
  ${backgroundWithColor('White')}
  margin: 4px 0;
`

const DetailTimeText = styled.Text`
  ${Typo.Alarm2_600};
  color: ${ColorPalette.BlueGray_5};
  margin-bottom: 26px;
`

const DetailDayView = styled.View`
  flex-direction: row;
`

const DetailDayItem = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  ${backgroundWithColor('LinkkleBlueGray')}
  margin: 0 4px;
  justify-content: center;
`

const DetailDayText = styled.Text`
  color: ${ColorPalette.White};
  ${Typo.Heading4_600};
  text-align: center;
`

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

interface Props {
  cron: string
}

const RemindingDetailInfo = ({ cron }: Props) => {
  const [time, setTime] = useState<string>()
  const [days, setDays] = useState<string[]>()

  useEffect(() => {
    const splittedCron = cron.split(' ')
    const min = parseInt(splittedCron[1], 10)
    let hour = parseInt(splittedCron[2], 10)
    const AMPM = hour < 12 ? 'AM' : 'PM'
    if (hour > 12) {
      hour -= 12
    }
    const HOUR = hour < 10 ? '0' + hour : '' + hour
    const MIN = min < 10 ? '0' + min : '' + min
    const timeText = `${AMPM} ${HOUR}:${MIN}`
    const dayTexts = splittedCron[5].split(',').map(day => {
      const dayText = day as DAY_MAP_KEY
      return DAY_MAP[dayText]
    })

    setTime(timeText)
    setDays(dayTexts)
  }, [])

  return (
    <DetailInfoView>
      <DetailTimeText>{time}</DetailTimeText>
      <DetailDayView>
        {days?.map(day => (
          <DetailDayItem key={day}>
            <DetailDayText>{day}</DetailDayText>
          </DetailDayItem>
        ))}
      </DetailDayView>
    </DetailInfoView>
  )
}

export default RemindingDetailInfo
