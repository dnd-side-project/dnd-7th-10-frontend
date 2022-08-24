import React, { useEffect, useState } from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import GatherFolderItem from './GatherFolderItem'
import useFolderList from '../Home/FolderList.hook'
import { TouchableOpacity } from 'react-native'
import { ISelectedFromFolder } from '../../pages/RemindingGather'

const GatherFolderListView = styled.ScrollView`
  ${backgroundWithColor('White')}
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  height: 176px;
`

const GatherFolderView = styled.View`
  ${flexWithAlign('center', 'flex-start', 'row')}
  padding: 28px 16px;
`

interface Props {
  onChange?: (folderId: string) => void
  selectedArticles: ISelectedFromFolder
}

const GatherFolderList = ({ onChange, selectedArticles }: Props) => {
  const [selectIndex, setSelectIndex] = useState<number>(0)
  const [folderIds] = useFolderList()

  const onFolderPress = (index: number) => {
    setSelectIndex(index)
  }

  useEffect(() => {
    const folderId = folderIds[selectIndex]
    if (onChange) {
      onChange(folderId)
    }
  }, [selectIndex, onChange, folderIds])

  return (
    <GatherFolderListView horizontal>
      <GatherFolderView>
        {folderIds.map((folderId, index) => (
          <TouchableOpacity key={folderId} onPress={() => onFolderPress(index)}>
            <GatherFolderItem
              folderId={folderId}
              selected={selectIndex === index}
              selectCount={(selectedArticles[folderId] || []).length}
            />
          </TouchableOpacity>
        ))}
      </GatherFolderView>
    </GatherFolderListView>
  )
}

export default GatherFolderList
