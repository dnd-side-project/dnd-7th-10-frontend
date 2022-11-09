import React from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import RemindFolderItem from './RemindFolderItem'
import useFolderList from '../Home/FolderList.hook'
import { TouchableOpacity } from 'react-native'
import { ColorPalette, Typo } from '../../styles/variable'
import { useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../../pages/Router'

const RemindFolderWrapView = styled.View`
  ${backgroundWithColor('White')}
`

const RemindFolderListView = styled.ScrollView`
  ${backgroundWithColor('White')}
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
`

const RemindFolderView = styled.View`
  ${flexWithAlign('center', 'flex-start', 'row')}
  padding: 0 16px;
`

const RemindFolderText = styled.Text`
  ${Typo.Heading3_600}
  color: ${ColorPalette.BlueGray_4};
  margin: 24px;
  margin-bottom: 16px;
`

const RemindFolderList = () => {
  const [folderIds] = useFolderList()
  const navigation = useNavigation<RouterNavigationProps>()

  const onFolderPress = (index: number) => {
    navigation.navigate('FolderContent', { folderId: folderIds[index] })
  }

  return (
    <RemindFolderWrapView>
      <RemindFolderText>링끌폴더에서 리마인딩할 링크 모으기</RemindFolderText>
      <RemindFolderListView horizontal>
        <RemindFolderView>
          {folderIds.map((folderId, index) => (
            <TouchableOpacity
              key={folderId}
              onPress={() => onFolderPress(index)}
            >
              <RemindFolderItem folderId={folderId} />
            </TouchableOpacity>
          ))}
        </RemindFolderView>
      </RemindFolderListView>
    </RemindFolderWrapView>
  )
}

export default RemindFolderList
