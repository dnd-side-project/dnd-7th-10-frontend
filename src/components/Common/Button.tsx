import React, { PropsWithChildren } from 'react'
import styled from '@emotion/native'
import { GestureResponderEvent, ImageSourcePropType } from 'react-native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { fontWithColorFamily } from '../../styles/fonts'

function getButtonBackground({ secondary, disabled }: Partial<Props>) {
  if (disabled) {
    return backgroundWithColor('main_2')
  }

  if (secondary) {
    return backgroundWithColor('gray_5')
  }

  return backgroundWithColor('main_1')
}

const ButtonTouchable = styled.TouchableOpacity<Partial<Props>>`
  flex: ${props => (props.flex || '') + ''};
  flex-shrink: ${props => (props.flex ? '1' : '0')};
  height: ${props => (props.small ? '40px' : '56px')};
  width: ${props => (props.icon ? '56px' : 'auto')};
  margin: ${props => (props.group ? '0px 4px' : '0px')};
`

const ButtonView = styled.View<Props>`
  ${getButtonBackground}
  max-width: ${props => (props.icon ? '56px' : 'auto')};
  height: ${props => (props.small ? '40px' : '56px')};
  border-radius: 4px;
`

const ButtonText = styled.Text<Partial<Props>>`
  ${fontWithColorFamily('gray_1', 'SemiBold')}
  font-size: 15px;
  line-height: ${props => (props.small ? '40px' : '56px')};
  text-align: center;
`

const ButtonIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  top: 16px;
`

interface Props {
  small?: boolean
  disabled?: boolean
  secondary?: boolean
  group?: boolean
  flex?: number
  icon?: ImageSourcePropType
  onPress?: (e: GestureResponderEvent) => void
}

const Button = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <ButtonTouchable {...props}>
      <ButtonView {...props}>
        {props.icon ? (
          <ButtonIcon source={props.icon} resizeMode="contain" />
        ) : (
          <ButtonText small={props.small}>{children}</ButtonText>
        )}
      </ButtonView>
    </ButtonTouchable>
  )
}

export default Button
