import React, { useMemo } from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { Typo } from '../../styles/variable'
import { fontWithColor } from '../../styles/fonts'

const NoticeTopView = styled.View`
  ${backgroundWithColor('White')}
  justify-content:space-between;
  height: 134px;
  padding: 28px 24px 24px;
`

const NoticeFrameImage = styled.Image`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 133px;
`

const NoticeDateText = styled.Text`
  ${Typo.Heading4_600}
  ${fontWithColor('BlueGray_3')}
`

const NoticeTimeText = styled.Text`
  ${Typo.Alarm2_600}
  ${fontWithColor('BlueGray_5')}
`

const days = ['일', '월', '화', '수', '목', '금', '토']

const NoticeTop = () => {
  const date = useMemo(() => {
    const today = new Date()
    return `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 ${today.getDate()}일 (${days[today.getDay()]})`
  }, [])

  const time = useMemo(() => {
    const today = new Date()
    let hours = today.getHours()
    let minutes: string | number = today.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes

    return `${ampm} ${hours}:${minutes}`
  }, [])

  return (
    <NoticeTopView>
      <NoticeFrameImage
        source={require('../../assets/images/reminding_notice_frame.png')}
        resizeMode="contain"
      />
      <NoticeDateText>{date}</NoticeDateText>
      <NoticeTimeText>{time}</NoticeTimeText>
    </NoticeTopView>
  )
}

export default NoticeTop
