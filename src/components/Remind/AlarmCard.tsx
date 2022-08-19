import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'

const AlarmCardView = styled.View`
  width: 140px;
  height: 179px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-right: 16px;
`
const Toggle = styled.View`
  position: absolute;
  width: 32px;
  height: 20px;
  right: 16px;
  top: 16px;
  background: #ff5216;
  border-radius: 200px;
`
const Circle = styled.View`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 2px;
  top: 2px;
  border-radius: 20px;
  background: #ffffff;
`
const AlarmText = styled.Text`
  position: absolute;
  width: 88px;
  height: 48px;
  left: 16px;
  top: 44px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_5};
`

const DayText = styled.Text`
  position: absolute;
  width: 116px;
  height: 17px;
  left: 16px;
  top: 108px;
  font-family: ${Typo.Detail1_400}
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4};
`

const LinkNum = styled.Text`
  position: absolute;
  width: 30px;
  height: 14px;
  right: 16px;
  bottom: 16px;
  font-family:${Typo.Detail2_400}
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  letter-spacing: -0.6px;
  color: #${ColorPalette.BlueGray_3}
`

const AlarmCard = () => {
  return (
    <AlarmCardView>
      <Toggle>
        <Circle />
      </Toggle>
      <AlarmText>AM{'\n'}09:30</AlarmText>
      <DayText>월 화 수 목 금 토</DayText>
      <LinkNum>20개</LinkNum>
    </AlarmCardView>
  )
}

export default AlarmCard
