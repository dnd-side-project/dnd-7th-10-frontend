import React, { useMemo } from 'react'
import styled from '@emotion/native'
import { fontWithColorFamily } from '../../styles/fonts'
import { useRecoilValue } from 'recoil'
import { foldersFamily } from '../../recoil/folders'
import { folderColors } from '../FolderAdd/FolderColorList'

const FolderSelectItemView = styled.View`
  width: 108px;
  margin-right: 16px;
`

const FolderSelectItemImage = styled.Image`
  width: 108px;
  height: 90px;
  margin-bottom: 6px;
`

const FolderSelectItemText = styled.Text`
  ${fontWithColorFamily('gray_6', 'SemiBold')}
  font-size: 14px;
`

const FolderSelectedImage = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 34px;
  left: 38px;
`

interface Props {
  selected?: boolean
  folderId: string
}

const FolderSelectItem = ({ folderId, selected }: Props) => {
  const folder = useRecoilValue(foldersFamily(folderId))

  const folderSource = useMemo(() => {
    const source =
      (folderColors.find(({ name }) => name === folder.folderColor) || {})
        .source || folderColors[0].source!
    return source
  }, [folder])

  return (
    <FolderSelectItemView>
      <FolderSelectItemImage source={folderSource} resizeMode="stretch" />
      <FolderSelectItemText>{folder.folderTitle}</FolderSelectItemText>
      {selected && (
        <FolderSelectedImage
          source={require('../../assets/images/folder_selected.png')}
          resizeMode="contain"
        />
      )}
    </FolderSelectItemView>
  )
}

export default FolderSelectItem
