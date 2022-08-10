import styled from '@emotion/native'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

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

export interface Folder {
  count: number
  name: string
  source: ImageSourcePropType
}

interface Props {
  folder: Folder
}

const FolderItem = ({ folder }: Props) => {
  return (
    <FolderView>
      <FolderImage source={folder.source} resizeMode="contain" />
      <FolderCountText>{folder.count}</FolderCountText>
      <FolderNameText>{folder.name}</FolderNameText>
    </FolderView>
  )
}

export default FolderItem
