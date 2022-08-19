import React from 'react'
import styled from '@emotion/native'
import { folderCoverColors } from '../Home/FolderItem'
import { fontWithColor } from '../../styles/fonts'
import { Typo } from '../../styles/variable'
import { ImageSourcePropType } from 'react-native'

const GatherFolderItemView = styled.View`
  width: 105px;
  height: 124px;
  margin: 0 8px;
`

const GatherFolderImage = styled.Image`
  width: 105px;
  height: 80px;
  margin-bottom: 8px;
`

const GatherSelectedImage = styled.Image`
  width: 33px;
  height: 33px;
  position: absolute;
  top: 36px;
  left: 32px;
`

const GatherFolderNameText = styled.Text<{ selected?: boolean }>`
  ${props => fontWithColor(props.selected ? 'BlueGray_4' : 'BlueGray_3')}
  ${Typo.Detail1_400}
  margin-bottom: 4px;
`

const GatherFolderCountText = styled.Text<{ selected?: boolean }>`
  ${props => fontWithColor(props.selected ? 'BlueGray_4' : 'BlueGray_3')}
  ${Typo.Detail2_400}
`

const GatherFolderAccentText = styled.Text`
  ${fontWithColor('LinkkleOrange')}
`

interface Props {
  source?: ImageSourcePropType
  articleCount?: number
  selected?: boolean
  selectedCount?: number
  folderName: string
}

const GatherFolderItem = ({
  source,
  articleCount,
  selected,
  selectedCount,
  folderName
}: Props) => {
  return (
    <GatherFolderItemView>
      <GatherFolderImage source={source || folderCoverColors[0].source!} />
      {selected && (
        <GatherSelectedImage
          source={require('../../assets/images/folder_selected_star.png')}
        />
      )}
      <GatherFolderNameText selected={selected}>
        {folderName}
      </GatherFolderNameText>
      <GatherFolderCountText selected={selected}>
        <GatherFolderAccentText>{selectedCount || 0}</GatherFolderAccentText>
        {' / '}
        {articleCount || 0}개
      </GatherFolderCountText>
    </GatherFolderItemView>
  )
}

export default GatherFolderItem
