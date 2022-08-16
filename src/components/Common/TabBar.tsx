import React from 'react'
import styled, { css } from '@emotion/native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { backgroundWithColor } from '../../styles/backgrounds'
import {
  NavigationHelpers,
  ParamListBase,
  RouteProp,
  TabNavigationState
} from '@react-navigation/native'
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap
} from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import { TouchableOpacity } from 'react-native'
import SVG from '../../assets/images/svg'
import { SvgProps } from 'react-native-svg'
import { ColorPalette } from '../../styles/variable'
import { flexWithAlign } from '../../styles/flexbox'

const TabBarView = styled.View`
  flex-direction: row;
  align-items: stretch;
  height: 88px;
  ${backgroundWithColor('gray_1')}
`

interface TabBarTextProps {
  focused: boolean
}

const TabBarText = styled.Text<TabBarTextProps>`
  margin-top: 10px;
  height: 14px;
  font-size: 12px;
  color: ${props =>
    props.focused ? ColorPalette.gray_7 : ColorPalette.gray_4};
`

interface BottomParamList extends ParamListBase {
  Home: undefined
  Remiding: undefined
}

interface TabButtonProps {
  route: RouteProp<BottomParamList>
  index: number
  state: TabNavigationState<BottomParamList>
  descriptors: BottomTabDescriptorMap
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
}

const tabIconStyle = css`
  width: 24px;
  height: 24px;
`

interface ITabInfos {
  [route: string]: {
    name: string
    Icon: React.FC<SvgProps>
  }
}

const tabInfos: ITabInfos = {
  Home: {
    name: '링끌폴더',
    Icon: SVG.Folder
  },
  Reminding: {
    name: '리마인딩',
    Icon: SVG.Reminding
  }
}

const TabButtonView = styled.View`
  ${flexWithAlign('center', 'center')}
  top: 20px;
`

const TabButton = ({
  route,
  index,
  state,
  descriptors,
  navigation
}: TabButtonProps) => {
  const { options } = descriptors[route.key]

  const isFocused = state.index === index

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true
    })

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate(route.name, { name: route.name, merge: true })
    }
  }
  const tabInfoKey: keyof BottomParamList = route.name
  const tabInfo = tabInfos[tabInfoKey]
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      style={{ flex: 1 }}
    >
      <TabButtonView>
        {
          <tabInfo.Icon
            style={tabIconStyle}
            stroke={isFocused ? ColorPalette.gray_7 : ColorPalette.gray_4}
          />
        }
        {<TabBarText focused={isFocused}>{tabInfo.name}</TabBarText>}
      </TabButtonView>
    </TouchableOpacity>
  )
}

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <TabBarView>
      {state.routes.map((route, index) => (
        <TabButton
          key={route.name}
          route={route}
          index={index}
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />
      ))}
    </TabBarView>
  )
}

export default TabBar