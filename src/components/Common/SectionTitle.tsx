import React from 'react'
import styled from '@emotion/native'
import { fontWithColorFamily } from '../../styles/fonts'
import { flexWithAlign } from '../../styles/flexbox'

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
}

const SectionTitle = ({ title, plus }: Props) => {
  return (
    <SectionTitleView>
      <SectionTitleText>{title}</SectionTitleText>
      {plus && (
        <SectionTitleIcon
          source={require('../assets/images/plus.png')}
          resizeMode="contain"
        />
      )}
    </SectionTitleView>
  )
}

export default SectionTitle
