import styled from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { RouterNavigationProps } from '../../pages/Router'
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
  const navigation = useNavigation<RouterNavigationProps>()
  const [folderIds] = useFolderList()

  const onFolderPress = (folderId: string) => {
    navigation.navigate('FolderContent', { folderId })
  }

  return (
    <FolderListScrollView>
      <FolderListView>
        {folderIds.map(folderId => (
          <TouchableOpacity
            key={folderId}
            onPress={() => onFolderPress(folderId)}
          >
            <FolderItem folderId={folderId} />
          </TouchableOpacity>
        ))}
        <FolderAdd />
      </FolderListView>
    </FolderListScrollView>
  )
}

export default FolderList
