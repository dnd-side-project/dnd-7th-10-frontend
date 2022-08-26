import React from 'react'
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

const NoticeTop = () => {
  return (
    <NoticeTopView>
      <NoticeFrameImage
        source={require('../../assets/images/reminding_notice_frame.png')}
        resizeMode="contain"
      />
      <NoticeDateText>2022년 08월 16일 (화)</NoticeDateText>
      <NoticeTimeText>AM 09:30</NoticeTimeText>
    </NoticeTopView>
  )
}

export default NoticeTop
