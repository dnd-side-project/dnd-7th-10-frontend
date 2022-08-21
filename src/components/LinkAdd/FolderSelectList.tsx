import React, { useEffect, useState } from 'react'
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

interface Props {
  folderId: string
  onChange?: (value: string) => void
}

const FolderSelectList = ({ folderId, onChange }: Props) => {
  const [selected, setSelected] = useState<number>(-1)
  const [folderIds] = useFolderList()

  useEffect(() => {
    if (folderId) {
      const index = folderIds.indexOf(folderId)
      if (index > -1) {
        setSelected(index)
      }
    }
  }, [folderId, folderIds])

  const onPress = (index: number) => {
    if (index < folderIds.length) {
      setSelected(index)
      if (onChange) {
        onChange(folderIds[index])
      }
    }
  }

  return (
    <FolderSelectListScrollView horizontal>
      <FolderSelectListView>
        {folderIds.map((_folderId, index) => {
          return (
            <FolderTouchable key={_folderId} onPress={() => onPress(index)}>
              <FolderSelectItem
                folderId={_folderId}
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
