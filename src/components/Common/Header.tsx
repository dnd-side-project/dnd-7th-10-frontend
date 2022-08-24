import React, { PropsWithChildren, useCallback } from 'react'
import styled from '@emotion/native'
import { flexWithAlign } from '../../styles/flexbox'
import { fontWithColorFamily } from '../../styles/fonts'
import {
  GestureResponderEvent,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useHeaderEvent from '../../hooks/useHeaderEvent'
import Input from './Input'

const HeaderBar = styled.View`
  ${flexWithAlign('center', 'flex-start', 'row')}
  height: 60px;
  background: white;
  padding: 0 24px;
  elevation: 12;
`

const HeaderIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`

const HeaderIconButton = styled(HeaderIcon)`
  margin-left: 22px;
`

const HeaderText = styled.Text`
  ${fontWithColorFamily('gray_7', 'SemiBold')}
  font-size: 20px;
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

const HeaderSearchView = styled.View`
  flex: 1;
  margin: 0;
`

const SaveButtonInsets = { top: 16, bottom: 16, left: 16, right: 16 }

const IconButtonInsets = { top: 16, bottom: 16, left: 4, right: 4 }

export interface IIconButton {
  name: string
  source: ImageSourcePropType
}

export interface IHeaderButtonClickHandler {
  (event: GestureResponderEvent): void
}

interface IconButtonsWrapProps {
  iconButtons: IIconButton[]
  onIconPress: (name: string) => void
}

const IconButtonsWrap = ({
  iconButtons,
  onIconPress
}: IconButtonsWrapProps) => {
  return (
    <IconButtonsView>
      {iconButtons?.map(iconButton => (
        <TouchableOpacity
          key={iconButton.name}
          hitSlop={IconButtonInsets}
          onPress={() => onIconPress(iconButton.name)}
        >
          <HeaderIconButton source={iconButton.source} resizeMode="contain" />
        </TouchableOpacity>
      ))}
    </IconButtonsView>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    zIndex: 999
  }
})

const backButtonInsets = { top: 8, bottom: 8, left: 16, right: 16 }

interface Props {
  save?: boolean
  onSavePress?: IHeaderButtonClickHandler
  iconButtons?: IIconButton[]
  hideBack?: boolean
  search?: boolean
  onSearchClose?: () => void
}

const Header = ({
  children,
  save,
  iconButtons,
  onSavePress,
  hideBack,
  search,
  onSearchClose
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation()
  const { handlers } = useHeaderEvent()

  const onBackPress = () => {
    if (search) {
      if (onSearchClose) {
        onSearchClose()
      }
    } else {
      navigation.goBack()
    }
  }

  const onIconPress = useCallback(
    (name: string) => {
      handlers.forEach(handler => handler(name))
    },
    [handlers]
  )

  return (
    <HeaderBar style={styles.shadow}>
      {!hideBack && (
        <TouchableOpacity onPress={onBackPress} hitSlop={backButtonInsets}>
          <HeaderIcon
            source={require('../../assets/images/chevron-left.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {search ? (
        <HeaderSearchView>
          <Input search small style={{ paddingRight: 48 }} />
        </HeaderSearchView>
      ) : (
        <>
          <HeaderText numberOfLines={1}>{children}</HeaderText>
          {save && (
            <SaveButton hitSlop={SaveButtonInsets} onPress={onSavePress}>
              <SaveButtonText>저장</SaveButtonText>
            </SaveButton>
          )}
          {iconButtons && (
            <IconButtonsWrap
              onIconPress={onIconPress}
              iconButtons={iconButtons}
            />
          )}
        </>
      )}
    </HeaderBar>
  )
}

export default Header
