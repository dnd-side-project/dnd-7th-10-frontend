import React, { useCallback, useState } from 'react'
import styled from '@emotion/native'
import { ColorPalette } from '../../styles/variable'
import { backgroundWithColor } from '../../styles/backgrounds'
import { fontWithColorFamily } from '../../styles/fonts'
import { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native'

interface InputViewProps {
  focused: boolean
  small?: boolean
}

const InputView = styled.View<InputViewProps>`
  ${backgroundWithColor('background_1')}
  border: 1px solid ${props =>
    props.focused ? ColorPalette.gray_6 : ColorPalette.gray_3};
  border-radius: 4px;
  padding: ${props => (props.small ? '0 8px' : '0 20px')};
  line-height: ${props => (props.small ? '48px' : '56px')};
  height: ${props => (props.small ? '48px' : '56px')};
  justify-content: center;
`

const InputTextInput = styled.TextInput`
  ${fontWithColorFamily('gray_7', 'Regular')}
  font-size: 16px;
`

interface Props {
  value?: string
  onChangeText?: (text: string) => void
  small?: boolean
  disabled?: boolean
  onEnterPress?: () => void
}

const Input = ({
  value,
  onChangeText,
  small,
  disabled,
  onEnterPress
}: Props) => {
  const [focused, setFocused] = useState<boolean>(false)

  const handleFocusOn = () => setFocused(true)
  const handleFocusOff = () => setFocused(false)

  const onKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const { key } = e.nativeEvent
      console.log(key)
    },
    []
  )

  return (
    <InputView focused={focused} small={small}>
      <InputTextInput
        onFocus={handleFocusOn}
        onBlur={handleFocusOff}
        editable={!disabled}
        onKeyPress={onKeyPress}
        selectTextOnFocus={!disabled}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onEnterPress}
        placeholder="링크를 입력해주세요"
        placeholderTextColor={ColorPalette.gray_5}
      />
    </InputView>
  )
}

export default Input
