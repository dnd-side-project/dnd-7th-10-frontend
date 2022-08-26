import React, { Ref, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/native'
import { ColorPalette } from '../../styles/variable'
import { backgroundWithColor } from '../../styles/backgrounds'
import { fontWithColorFamily } from '../../styles/fonts'
import { StyleProp, TextInput, ViewStyle } from 'react-native'
import { forwardRef } from 'react'

interface InputViewProps {
  focused: boolean
  small?: boolean
}

const InputView = styled.View<InputViewProps>`
  ${backgroundWithColor('background_1')}
  border: 1px solid ${props =>
    props.focused ? ColorPalette.LinkkleOrange : ColorPalette.gray_3};
  border-radius: 4px;
  padding: ${props => (props.small ? '0 8px' : '0 12px')};
  line-height: ${props => (props.small ? '44px' : '56px')};
  height: ${props => (props.small ? '44px' : '56px')};
  justify-content: center;
`

const InputTextInput = styled.TextInput`
  ${fontWithColorFamily('gray_7', 'Regular')}
  font-size: 16px;
  width: 220px;
`
const SearchCloseTouchable = styled.TouchableOpacity<{ small?: boolean }>`
  position: absolute;
  top: ${props => (props.small ? '10px' : '16px')};
  right: 16px;
`

const SearchCloseImage = styled.Image`
  width: 24px;
  height: 24px;
`

const SearchIconTouchable = styled.Pressable<{ small?: boolean }>`
  position: absolute;
  right: 12px;
  top: ${props => (props.small ? '10px' : '16px')};
`

const SearchIconImage = styled.Image`
  width: 24px;
  height: 24px;
`

interface Props {
  value?: string
  onChangeText?: (text: string) => void
  small?: boolean
  disabled?: boolean
  onEnterPress?: () => void
  style?: StyleProp<ViewStyle>
  placeholder?: string
  search?: boolean
  noReset?: boolean
}

const closeInsets = { top: 8, bottom: 8, left: 8, right: 8 }

const Input = forwardRef(
  (
    {
      value,
      onChangeText,
      small,
      disabled,
      onEnterPress,
      style,
      placeholder,
      search,
      noReset
    }: Props,
    ref: Ref<TextInput>
  ) => {
    const [focused, setFocused] = useState<boolean>(false)
    const [text, setText] = useState<string>('')

    const handleFocusOn = () => setFocused(true)
    const handleFocusOff = () => setFocused(false)

    const onKeyPress = useCallback(
      // (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      () => {
        // const { key } = e.nativeEvent
        //
      },
      []
    )

    useEffect(() => {
      setText(value || '')
    }, [value])

    const onChangeRealText = (newText: string) => {
      setText(newText)
      if (onChangeText) {
        onChangeText(newText)
      }
    }

    const onClosePress = () => {
      onChangeRealText('')
    }

    return (
      <InputView focused={focused} small={small} style={style}>
        <InputTextInput
          ref={ref}
          onFocus={handleFocusOn}
          onBlur={handleFocusOff}
          editable={!disabled}
          onKeyPress={onKeyPress}
          selectTextOnFocus={!disabled}
          value={text}
          onChangeText={onChangeRealText}
          onSubmitEditing={onEnterPress}
          placeholder={placeholder}
          placeholderTextColor={ColorPalette.gray_5}
        />
        {!noReset && (text || '').length > 0 ? (
          <SearchCloseTouchable
            hitSlop={closeInsets}
            onPress={onClosePress}
            small={small}
          >
            <SearchCloseImage
              source={require('../../assets/images/search_close.png')}
              resizeMode="contain"
            />
          </SearchCloseTouchable>
        ) : (
          search && (
            <SearchIconTouchable small={small}>
              <SearchIconImage
                source={require('../../assets/images/icon_search.png')}
                resizeMode="contain"
              />
            </SearchIconTouchable>
          )
        )}
      </InputView>
    )
  }
)

export default Input
