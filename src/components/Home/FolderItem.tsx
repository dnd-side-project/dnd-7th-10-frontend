import styled from '@emotion/native'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { foldersFamily } from '../../recoil/folders'

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

interface Props {
  folderId: string
}

const FolderItem = ({ folderId }: Props) => {
  const folder = useRecoilValue(foldersFamily(folderId))

  return (
    <FolderView>
      <FolderImage
        source={require('../../assets/images/folder_1.png')}
        resizeMode="contain"
      />
      <FolderCountText>{folder.articleCount}</FolderCountText>
      <FolderNameText>{folder.folderTitle}</FolderNameText>
    </FolderView>
  )
}

export default FolderItem
