import styled from '@emotion/native'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { foldersFamily } from '../../recoil/folders'
import { IFolderColor } from '../FolderAdd/FolderColorList'

const FolderView = styled.View`
  max-width: 156px;
  margin-bottom: 32px;
`

const FolderImage = styled.Image`
  width: 156px;
  height: 120px;
`

const FolderCountText = styled.Text`
  font-family: 'Pretendard-SemiBold';
  font-size: 14px;
  color: #ffffff;
  position: absolute;
  top: 4px;
  left: 8px;
`

const FolderNameText = styled.Text`
  font-family: 'Pretendard-SemiBold';
  font-size: 16px;
  color: #26344a;
  margin-top: 8px;
`

export const folderCoverColors: IFolderColor[] = [
  {
    name: 'Navy',
    source: require('../../assets/images/folder_cover_navy.png')
  },
  {
    name: 'Sky',
    source: require('../../assets/images/folder_cover_sky.png')
  },
  {
    name: 'Pink',
    source: require('../../assets/images/folder_cover_pink.png')
  },
  {
    name: 'Yellow',
    source: require('../../assets/images/folder_cover_yellow.png')
  },
  {
    name: 'Orange',
    source: require('../../assets/images/folder_cover_orange.png')
  },
  {
    name: 'fake',
    fake: true
  }
]

interface Props {
  folderId: string
}

const FolderItem = ({ folderId }: Props) => {
  const folder = useRecoilValue(foldersFamily(folderId))

  const folderImage =
    (folderCoverColors.find(({ name }) => name === folder.folderColor) || {})
      .source || folderCoverColors[0].source!

  return (
    <FolderView>
      <FolderImage source={folderImage} resizeMode="contain" />
      <FolderCountText numberOfLines={1}>{folder.articleCount}</FolderCountText>
      <FolderNameText numberOfLines={1}>{folder.folderTitle}</FolderNameText>
    </FolderView>
  )
}

export default FolderItem
