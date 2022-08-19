import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'

const MemoCardView = styled.View`
  width: 200px;
  height: 300px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-right: 16px;
`

const MemoCardDate = styled.Text`
  position: absolute;
  width: 56px;
  height: 14px;
  right: 16px;
  top: 16px;
  font-family: ${Typo.Detail2_400};
  color: ${ColorPalette.BlueGray_3};
`
const MemoCardText = styled.Text`
  position: absolute;
  width: 168px;
  height: 164px;
  left: 16px;
  top: 56px;

  font-family: ${Typo.Body2_600}
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.6px;

  color: ${ColorPalette.BlueGray_5};
`
const BottomImg = styled.Image`
  position: absolute;
  width: 40px;
  height: 40px;
  left: 16px;
  bottom: 16px;
  border-radius: 38px;
`
const UrlFolder = styled.Text`
  position: absolute;
  width: 72px;
  height: 14px;
  left: 64px;
  bottom: 42px;

  font-family: ${Typo.Detail2_400}
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.6px;
  color:${ColorPalette.BlueGray_3}
`
const UrlTitle = styled.Text`
  position: absolute;
  width: 120px;
  height: 24px;
  left: 64px;
  bottom: 16px;

  font-family: ${Typo.Heading4_600}
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4}
`

const MemoCollection = () => {
  return (
    <MemoCardView>
      <MemoCardDate>2022.08.21</MemoCardDate>
      <MemoCardText>
        Apple’s Human Interface Guidelines (HIG) is a comprehensive resource for
        designers and developers looking to create.
      </MemoCardText>
      <BottomImg source={{ uri: 'https://via.placeholder.com/16x16' }} />
      <UrlFolder>디자인 레퍼런스</UrlFolder>
      <UrlTitle>Developer apple</UrlTitle>
    </MemoCardView>
  )
}

export default MemoCollection
