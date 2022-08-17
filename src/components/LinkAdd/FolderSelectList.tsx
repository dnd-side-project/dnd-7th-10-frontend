import React, { useState } from 'react'
import styled from '@emotion/native'
import FolderSelectItem from './FolderSelectItem'
import useFolderList from '../Home/FolderList.hook'

const FolderSelectListScrollView = styled.ScrollView`
  margin: 0 -24px;
`

const FolderSelectListView = styled.View`
  flex-direction: row;
  padding-left: 24px;
`

const FolderTouchable = styled.TouchableOpacity``

const FolderSelectList = () => {
  const [selected, setSelected] = useState<number>(-1)
  const [folderIds] = useFolderList()

  const onPress = (index: number) => {
    if (index < folderIds.length) {
      setSelected(index)
    }
  }

  return (
    <FolderSelectListScrollView horizontal>
      <FolderSelectListView>
        {folderIds.map((folderId, index) => {
          return (
            <FolderTouchable key={folderId} onPress={() => onPress(index)}>
              <FolderSelectItem
                folderId={folderId}
                selected={index === selected}
              />
            </FolderTouchable>
          )
        })}
      </FolderSelectListView>
    </FolderSelectListScrollView>
  )
}

export default FolderSelectList
