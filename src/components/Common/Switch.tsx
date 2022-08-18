import React, { useEffect, useState } from 'react'
import styled from '@emotion/native'
import { Animated, Pressable } from 'react-native'
import { backgroundWithColor } from '../../styles/backgrounds'

const SwitchView = styled.View`
  ${backgroundWithColor('LinkkleLightBlueGray')}
  width: 32px;
  height: 20px;
  border-radius: 15px;
  justify-content: center;
  overflow: hidden;
`

const SwitchColored = styled(Animated.View)`
  ${backgroundWithColor('LinkkleOrange')}
  width: 100%;
  height: 100%;
`

const SwitchWheel = styled(Animated.View)`
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 8px;
  padding: 2px;
  position: absolute;
  left: 2px;
  top: 2px;
`

const swtichInsets = { top: 8, bottom: 8, right: 8, left: 8 }

interface Props {
  value?: boolean
  onChange?: (value: boolean) => void
}

const Switch = ({ value, onChange }: Props) => {
  const [translateValue] = useState(new Animated.Value(0))

  const moveSwitchWheel = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12]
  })

  useEffect(() => {
    Animated.timing(translateValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start()
  }, [value, translateValue])

  const onPress = () => {
    if (onChange) {
      onChange(!value)
    }
  }

  return (
    <Pressable onPress={onPress} hitSlop={swtichInsets}>
      <SwitchView>
        <SwitchColored style={{ opacity: translateValue }} />
        <SwitchWheel style={{ transform: [{ translateX: moveSwitchWheel }] }} />
      </SwitchView>
    </Pressable>
  )
}

export default Switch
