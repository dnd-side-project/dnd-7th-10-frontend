import React, { useRef, useState, useEffect } from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import {
  NativeScrollEvent,
  NativeScrollPoint,
  NativeSyntheticEvent,
  Pressable,
  ScrollView
} from 'react-native'
import { Typo } from '../../styles/variable'
import { fontWithColor } from '../../styles/fonts'
import { debounce } from '../../utils/debounce'

const SelectView = styled.View`
  align-items: center;
  width: 54px;
  height: 164px;
  background: white;
`

const SelectDivider = styled.View<{ top: number }>`
  ${backgroundWithColor('LinkkleLightBlueGray')}
  position: absolute;
  top: ${props => props.top + 'px'};
  left: 3px;
  width: 48px;
  height: 1px;
`

const SelectScroll = styled.ScrollView`
  flex: 1;
`

interface SelectProp {
  selected?: boolean
}

const SelectItem = styled.Text<SelectProp>`
  ${props => fontWithColor(props.selected ? 'BlueGray_5' : 'BlueGray_3')}
  ${props => (props.selected ? Typo.Alarm1_600 : Typo.Heading1_600)}
  height: 54px;
  text-align: center;
  line-height: 54px;
`

const containerStyle = { flexGrow: 1 }

interface Props {
  options: string[]
  onChange?: (option: string) => void
  newValue?: string
}

const Select = ({ options, onChange, newValue }: Props) => {
  const [value, setValue] = useState<number>(0)
  const scrollView = useRef<ScrollView>(null)

  useEffect(() => {
    if (newValue) {
      const index = options.indexOf(newValue || '')
      if (index > -1) {
        onPress(index)
      }
    }
  }, [newValue])

  const updateValue = (index: number) => {
    if (index !== value) {
      setValue(index)
      if (onChange) {
        onChange(options[index])
      }
    }
  }

  const onPress = (index: number) => {
    const offset = 54 * index
    if (scrollView.current) {
      scrollView.current.scrollTo({ y: offset, animated: true })
      updateValue(index)
    }
  }

  const onEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    debounceHandler(e.nativeEvent.contentOffset)
  }

  const debounceHandler = debounce((contentOffset: NativeScrollPoint) => {
    const { y } = contentOffset
    const index = Math.floor((y + 27) / 54)
    const offset = 54 * index
    if (scrollView.current) {
      scrollView.current.scrollTo({ y: offset, animated: true })
      updateValue(index)
    }
  }, 60)

  return (
    <SelectView>
      <SelectScroll
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        contentContainerStyle={containerStyle}
        onMomentumScrollEnd={onEnd}
      >
        <SelectItem />
        {options.map((option, index) => (
          <Pressable key={option} onPress={() => onPress(index)}>
            <SelectItem selected={index === value}>{option}</SelectItem>
          </Pressable>
        ))}
        <SelectItem />
      </SelectScroll>
      <SelectDivider top={55} />
      <SelectDivider top={110} />
    </SelectView>
  )
}

export default Select
