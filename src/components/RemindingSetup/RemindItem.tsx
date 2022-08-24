import React from 'react'
import styled from '@emotion/native'
import { flexWithAlign } from '../../styles/flexbox'
import { fontWithColor } from '../../styles/fonts'
import { ColorPalette, Typo } from '../../styles/variable'
import SVG from '../../assets/images/svg'
import { ImageSourcePropType } from 'react-native'
import { backgroundWithColor, shadowShallow } from '../../styles/backgrounds'

const RemindItemView = styled.View`
  ${flexWithAlign('center', 'flex-start', 'row')}
  ${backgroundWithColor('White')}
  height: 72px;
  padding: 16px;
  margin-bottom: 16px;
`

const RemindImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 16px;
`

const RemindContent = styled.View`
  flex: 1;
`

const RemindFolderText = styled.Text`
  ${fontWithColor('BlueGray_3')}
  ${Typo.Detail2_400}
`

const RemindArticleText = styled.Text`
  ${fontWithColor('BlueGray_5')}
  ${Typo.Heading4_600}
`

interface Props {
  source?: ImageSourcePropType
  articleName: string
  folderName: string
}

const RemindItem = ({ source, articleName, folderName }: Props) => {
  return (
    <RemindItemView style={shadowShallow}>
      <RemindImage
        source={source || { uri: 'https://via.placeholder.com/40x40' }}
      />
      <RemindContent>
        <RemindFolderText numberOfLines={1}>{folderName}</RemindFolderText>
        <RemindArticleText numberOfLines={1}>{articleName}</RemindArticleText>
      </RemindContent>
      <SVG.ChevronRight
        width={16}
        height={16}
        stroke={ColorPalette.LinkkleBlueGray}
      />
    </RemindItemView>
  )
}

export default RemindItem
