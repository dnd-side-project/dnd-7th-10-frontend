import React from 'react'
import styled from '@emotion/native'
import {
  CardContent,
  CardCoverImage,
  CardCoverOverlay,
  CardTag,
  CardTagList,
  CardView,
  defaultSource
} from '../Common/Card'
import { shadowShallow } from '../../styles/backgrounds'
import SVG from '../../assets/images/svg'
import { ColorPalette, Typo } from '../../styles/variable'
import { fontWithColor } from '../../styles/fonts'

const GatherArticleItemView = styled.View`
  min-width: 130px;
  margin: 8px;
`

const BookmarkView = styled.View`
  width: 24px;
  height: 24px;
  right: 16px;
  top: 16px;
  position: absolute;
`

const GatherSelectedImage = styled.Image<{ selected?: boolean }>`
  width: 32px;
  height: 32px;
  position: absolute;
  left: 16px;
  top: 16px;
  opacity: ${props => (props.selected ? '1' : '0.6')};
`

const GatherFolderNameText = styled.Text`
  ${fontWithColor('BlueGray_3')}
  ${Typo.Detail1_400}
  margin-top: 6px;
  margin-bottom: 4px;
`

const GatherArticleNameText = styled.Text`
  ${fontWithColor('BlueGray_4')}
  ${Typo.Heading4_600}
`

interface Props {
  source?: string
  tags?: string[] | null
  articleName: string
  folderName: string
  selected?: boolean
}

const GatherArticleItem = ({
  source,
  tags,
  articleName,
  folderName,
  selected
}: Props) => {
  return (
    <GatherArticleItemView>
      <CardView style={shadowShallow}>
        <CardCoverImage
          source={{ uri: source || defaultSource.uri }}
          resizeMode="cover"
        />
        <CardCoverOverlay />
        <GatherSelectedImage
          source={
            selected
              ? require('../../assets/images/folder_selected_fill.png')
              : require('../../assets/images/folder_selected.png')
          }
          resizeMode="contain"
          selected={selected}
        />
        <BookmarkView>
          <SVG.BookmarkFilled stroke={ColorPalette.White} />
        </BookmarkView>
        <CardContent>
          <GatherFolderNameText numberOfLines={1}>
            {folderName}
          </GatherFolderNameText>
          <GatherArticleNameText numberOfLines={1}>
            {articleName}
          </GatherArticleNameText>
          {tags && (
            <CardTagList>
              {tags.map(tag => (
                <CardTag key={tag} numberOfLines={1}>
                  {tag}
                </CardTag>
              ))}
            </CardTagList>
          )}
        </CardContent>
      </CardView>
    </GatherArticleItemView>
  )
}

export default GatherArticleItem
