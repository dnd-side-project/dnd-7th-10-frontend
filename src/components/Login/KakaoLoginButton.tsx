import React from 'react'
import styled from '@emotion/native'
import { GestureResponderEvent } from 'react-native'

const KakaoTouch = styled.TouchableOpacity`
  width: 100%;
`

const KakaoButton = styled.View`
  flex-direction: row;
  border-radius: 4px;
  background: #fee500;
  height: 56px;
  align-items: center;
  justify-content: center;
`

const KakaoText = styled.Text`
  font-family: 'Pretendard-SemiBold';
  font-size: 15px;
  color: #181600;
`

const KakaoIcon = styled.Image`
  width: 24px;
  height: 23px;
`

interface Props {
  onPress?: (e: GestureResponderEvent) => void
}

const KakaoLoginButton = ({ onPress }: Props) => {
  return (
    <KakaoTouch activeOpacity={0.9} onPress={onPress}>
      <KakaoButton>
        <KakaoIcon
          source={require('../../assets/images/kakao_login_large_wide.png')}
        />
        <KakaoText>카카오로 시작하기</KakaoText>
      </KakaoButton>
    </KakaoTouch>
  )
}

export default KakaoLoginButton
