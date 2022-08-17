import React from 'react'
import styled from '@emotion/native'
import { fontWithColorFamily } from '../../styles/fonts'
import { flexWithAlign } from '../../styles/flexbox'
import { TouchableOpacity } from 'react-native'

const SectionTitleView = styled.View`
  ${flexWithAlign('center', 'space-between', 'row')}
  margin-top: 24px;
  margin-bottom: 20px;
`

const SectionTitleText = styled.Text`
  ${fontWithColorFamily('gray_7', 'SemiBold')}
  font-size: 18px;
`

const SectionTitleIcon = styled.Image`
  width: 24px;
  height: 24px;
`

interface Props {
  title: string
  plus?: boolean
  onPlusPress?: () => void
}

const plusButtonInsets = { top: 6, bottom: 6, left: 6, right: 6 }

const SectionTitle = ({ title, plus, onPlusPress }: Props) => {
  return (
    <SectionTitleView>
      <SectionTitleText>{title}</SectionTitleText>
      {plus && (
        <TouchableOpacity onPress={onPlusPress} hitSlop={plusButtonInsets}>
          <SectionTitleIcon
            source={require('../../assets/images/plus.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </SectionTitleView>
  )
}

export default SectionTitle
