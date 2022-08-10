import styled from '@emotion/native'
import React from 'react'
import FolderAdd from './FolderAdd'
import FolderItem, { Folder } from './FolderItem'

const FolderListScrollView = styled.ScrollView`
  margin: 32px 0;
`

const FolderListView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FolderList = () => {
  const folders: Folder[] = [
    {
      count: 13,
      name: '하이',
      source: require('../assets/images/folder_1.png')
    },
    {
      count: 23,
      name: '바이',
      source: require('../assets/images/folder_2.png')
    },
    {
      count: 3,
      name: '기본',
      source: require('../assets/images/folder_3.png')
    },
    {
      count: 43,
      name: '바이1',
      source: require('../assets/images/folder_4.png')
    },
    {
      count: 53,
      name: '기본2',
      source: require('../assets/images/folder_5.png')
    }
  ]

  return (
    <FolderListScrollView>
      <FolderListView>
        {folders.map(folder => (
          <FolderItem folder={folder} />
        ))}
        <FolderAdd />
      </FolderListView>
    </FolderListScrollView>
  )
}

export default FolderList
