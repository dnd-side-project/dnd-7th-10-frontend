import React, { PropsWithChildren } from 'react'
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

const Header = ({
  children,
  save,
  iconButtons,
  onSavePress
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation()

  const onBackPress = () => {
    navigation.goBack()
  }

  return (
    <HeaderBar style={styles.shadow}>
      <TouchableOpacity onPress={onBackPress} hitSlop={backButtonInsets}>
        <HeaderIcon
          source={require('../../assets/images/chevron-left.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <HeaderText>{children}</HeaderText>
      {save && (
        <SaveButton hitSlop={SaveButtonInsets} onPress={onSavePress}>
          <SaveButtonText>저장</SaveButtonText>
        </SaveButton>
      )}
      {iconButtons && <IconButtonsWrap iconButtons={iconButtons} />}
    </HeaderBar>
  )
}

export default Header
