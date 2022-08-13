import React, { PropsWithChildren } from 'react'
import styled from '@emotion/native'
import { flexWithAlign } from '../../styles/flexbox'
import { fontWithColorFamily } from '../../styles/fonts'
import {
  GestureResponderEvent,
  ImageSourcePropType,
  TouchableOpacity
} from 'react-native'

const HeaderBar = styled.View`
  ${flexWithAlign('center', 'flex-start', 'row')}
  height: 72px;
  background: white;
  padding: 12px 24px 0;
  elevation: 4;
`

const HeaderIcon = styled.Image`
  width: 24px;
  height: 24px;
`

const HeaderIconButton = styled(HeaderIcon)`
  margin-left: 22px;
`

const HeaderText = styled.Text`
  ${fontWithColorFamily('gray_7', 'SemiBold')}
  font-size: 20px;
  margin-left: 12px;
`

const SaveButton = styled.TouchableOpacity`
  margin-left: auto;
`

const SaveButtonText = styled.Text`
  ${fontWithColorFamily('system_blue', 'SemiBold')}
  font-size: 16px;
`

const IconButtonsView = styled.View`
  margin-left: auto;
  flex-direction: row;
`

const SaveButtonInsets = { top: 16, bottom: 16, left: 16, right: 16 }

const IconButtonInsets = { top: 16, bottom: 16, left: 4, right: 4 }

export interface IIconButton {
  name: string
  source: ImageSourcePropType
  onPress: IHeaderButtonClickHandler
}

export interface IHeaderButtonClickHandler {
  (event: GestureResponderEvent): void
}

interface Props {
  save?: boolean
  onSavePress?: IHeaderButtonClickHandler
  iconButtons?: IIconButton[]
}

interface IconButtonsWrapProps {
  iconButtons: IIconButton[]
}

const IconButtonsWrap = ({ iconButtons }: IconButtonsWrapProps) => (
  <IconButtonsView>
    {iconButtons?.map(iconButton => (
      <TouchableOpacity
        key={iconButton.name}
        hitSlop={IconButtonInsets}
        onPress={iconButton.onPress}
      >
        <HeaderIconButton source={iconButton.source} resizeMode="contain" />
      </TouchableOpacity>
    ))}
  </IconButtonsView>
)

const Header = ({
  children,
  save,
  iconButtons,
  onSavePress
}: PropsWithChildren<Props>) => (
  <HeaderBar>
    <HeaderIcon
      source={require('../assets/images/chevron-left.png')}
      resizeMode="contain"
    />
    <HeaderText>{children}</HeaderText>
    {save && (
      <SaveButton hitSlop={SaveButtonInsets} onPress={onSavePress}>
        <SaveButtonText>저장</SaveButtonText>
      </SaveButton>
    )}
    {iconButtons && <IconButtonsWrap iconButtons={iconButtons} />}
  </HeaderBar>
)

export default Header
