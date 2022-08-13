import React from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { fontWithColorFamily } from '../../styles/fonts'
import { flexWithSelfAlign } from '../../styles/flexbox'

const TagGuideView = styled.View`
  ${backgroundWithColor('background_1')}
  ${flexWithSelfAlign('flex-start', 'flex-start')}
  height: 33px;
  border-radius: 3px;
  padding: 0 16px;
  margin-bottom: 20px;
`

const TagGuideText = styled.Text`
  ${fontWithColorFamily('gray_7', 'Regular')}
  font-size: 14px;
  line-height: 33px;
`

const TagGuide = () => {
  return (
    <TagGuideView>
      <TagGuideText>최대 3개까지 선택 가능해요!</TagGuideText>
    </TagGuideView>
  )
}

export default TagGuide
