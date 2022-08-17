import React from 'react'
import styled from '@emotion/native'
import { backgroundWithColor, shadow } from '../../styles/backgrounds'
import SVG from '../../assets/images/svg'
import { ColorPalette } from '../../styles/variable'
import { flexWithAlign } from '../../styles/flexbox'
import Input from './Input'
import { TouchableOpacity } from 'react-native'

const BrowserHeaderView = styled.View`
  ${backgroundWithColor('White')}
  ${flexWithAlign('center', 'flex-start', 'row')}
  width: 100%;
  height: 60px;
  padding: 0 24px;
`

const BrowserUrlInput = styled.View`
  flex: 1;
  margin-right: 16px;
`

const BrowserRefresh = styled.TouchableOpacity`
  position: absolute;
  top: 18px;
  bottom: 18px;
  right: 72px;
`

const rightMargin = {
  marginRight: 16
}

interface Props {
  onExitPress?: () => void
  onForwardPress?: () => void
  onBackwardPress?: () => void
  onRefreshPress?: () => void
  forward?: boolean
  backward?: boolean
}

const browserButtonInsets = { left: 8, right: 8, top: 8, bottom: 8 }

function getAccentColor(available: boolean) {
  return available ? ColorPalette.BlueGray_3 : ColorPalette.BlueGray_1
}

const BrowserHeader = ({
  onExitPress,
  onForwardPress,
  onBackwardPress,
  onRefreshPress,
  forward,
  backward
}: Props) => {
  return (
    <BrowserHeaderView style={shadow}>
      <TouchableOpacity
        disabled={!backward}
        onPress={onBackwardPress}
        hitSlop={browserButtonInsets}
      >
        <SVG.LeftArrow
          stroke={getAccentColor(backward || false)}
          style={rightMargin}
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!forward}
        onPress={onForwardPress}
        hitSlop={browserButtonInsets}
      >
        <SVG.RightArrow
          stroke={getAccentColor(forward || false)}
          style={rightMargin}
        />
      </TouchableOpacity>
      <BrowserUrlInput>
        <Input small />
      </BrowserUrlInput>
      <BrowserRefresh onPress={onRefreshPress} hitSlop={browserButtonInsets}>
        <SVG.Refresh stroke={ColorPalette.BlueGray_3} />
      </BrowserRefresh>
      <TouchableOpacity onPress={onExitPress} hitSlop={browserButtonInsets}>
        <SVG.Exit stroke={ColorPalette.BlueGray_3} />
      </TouchableOpacity>
    </BrowserHeaderView>
  )
}

export default BrowserHeader
