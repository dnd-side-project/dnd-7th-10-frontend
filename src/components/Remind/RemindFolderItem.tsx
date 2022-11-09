import React, { useMemo } from 'react'
import styled from '@emotion/native'
import { folderCoverColors } from '../Home/FolderItem'
import { fontWithColor } from '../../styles/fonts'
import { Typo } from '../../styles/variable'
import useFolderDetail from '../../hooks/useFolderDetail'

const RemindFolderItemView = styled.View`
  width: 105px;
  height: 124px;
  margin: 0 8px;
`

const RemindFolderImage = styled.Image`
  width: 105px;
  height: 80px;
  margin-bottom: 8px;
`

const RemindFolderNameText = styled.Text<{ selected?: boolean }>`
  ${props => fontWithColor(props.selected ? 'BlueGray_4' : 'BlueGray_3')}
  ${Typo.Detail1_400}
  margin-bottom: 4px;
`

interface Props {
  folderId: string
}

const RemindFolderItem = ({ folderId }: Props) => {
  const {
    isLoading,
    isError,
    recoilValue: folder
  } = useFolderDetail(folderId, true)

  const articleCount = useMemo(() => {
    if (!folder.articles) {
      return -1
    }
    const bookmarked = (folder.articles || []).filter(
      ({ bookmark }) => bookmark
    )
    return bookmarked.length
  }, [folder])

  if (isLoading || isError || articleCount === -1) {
    return <></>
  }
  const folderImage =
    (
      folderCoverColors.find(
        ({ name }) => name === (folder || {}).folderColor
      ) || {}
    ).source || folderCoverColors[0].source!

  return (
    <RemindFolderItemView>
      <RemindFolderImage source={folderImage || folderCoverColors[0].source!} />
      <RemindFolderNameText numberOfLines={1}>
        {folder.folderTitle}
      </RemindFolderNameText>
    </RemindFolderItemView>
  )
}

export default RemindFolderItem
