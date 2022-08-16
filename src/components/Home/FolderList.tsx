import styled from '@emotion/native'
import React from 'react'
import FolderAdd from './FolderAdd'
import FolderItem from './FolderItem'
import useFolderList from './FolderList.hook'

const FolderListScrollView = styled.ScrollView`
  margin: 24px 0 0;
`

const FolderListView = styled.View`
  margin: 8px 0 32px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FolderList = () => {
  const [folderIds] = useFolderList()

  return (
    <FolderListScrollView>
      <FolderListView>
        {folderIds.map(folder => (
          <FolderItem key={folder} folderId={folder} />
        ))}
        <FolderAdd />
      </FolderListView>
    </FolderListScrollView>
  )
}

export default FolderList
