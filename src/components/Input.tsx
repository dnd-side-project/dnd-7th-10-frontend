import React, { useState } from 'react'
import styled from '@emotion/native'
import { ColorPalette } from '../styles/variable'
import { backgroundWithColor } from '../styles/backgrounds'
import { fontWithColorFamily } from '../styles/fonts'

interface InputViewProps {
  focused: boolean
}

const InputView = styled.View<InputViewProps>`
  ${backgroundWithColor('background_1')}
  border: 1px solid ${props =>
    props.focused ? ColorPalette.gray_6 : ColorPalette.gray_3};
  border-radius: 4px;
  padding: 0 20px;
  line-height: 56px;
  height: 56px;
`

const InputTextInput = styled.TextInput`
  ${fontWithColorFamily('gray_7', 'Regular')}
  font-size: 16px;
  padding: 16px 0;
`

const Input = () => {
  const [focused, setFocused] = useState<boolean>(false)

  const handleFocusOn = () => setFocused(true)
  const handleFocusOff = () => setFocused(false)

  return (
    <InputView focused={focused}>
      <InputTextInput
        onFocus={handleFocusOn}
        onBlur={handleFocusOff}
        placeholder="링크를 입력해주세요"
        placeholderTextColor={ColorPalette.gray_5}
      />
    </InputView>
  )
}

export default Input
