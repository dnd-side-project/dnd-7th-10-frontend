import styled from '@emotion/native'
import Clipboard from '@react-native-clipboard/clipboard'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { AppState, AppStateStatus, TouchableOpacity } from 'react-native'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isValidUrl } from '../../lib/urlcheck'
import { RouterNavigationProps } from '../../pages/Router'
import { foldersAtom } from '../../recoil/folders'
import { quicklinkAtom, quicklinkLastAtom } from '../../recoil/global'
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
  const folders = useRecoilValue(foldersAtom)
  const setQuickLink = useSetRecoilState(quicklinkAtom)
  const last = useRecoilValue(quicklinkLastAtom)
  const setLast = useSetRecoilState(quicklinkLastAtom)

  const onFolderPress = (folderId: string) => {
    navigation.navigate('FolderContent', { folderId })
  }

  const checkClipboard = useCallback(async () => {
    const copied = await Clipboard.getString()
    console.log('cop', copied, '')
    const url = isValidUrl(copied)
    console.log('url', url)
    if (url) {
      setLast(url || '')
    }
    if (folderIds.length > 0) {
      const defaultFolder = folders.find(
        ({ folderId }) => folderId === folderIds[0]
      )
      console.log(defaultFolder?.folderTitle)
      if (defaultFolder) {
        console.log(copied, '\n\n', last, '\n\n', copied !== last, url)
        setLast(url || '')
        if (copied && copied !== last && url) {
          setQuickLink({
            folderId: folderIds[0],
            linkUrl: url
          })
        }
      }
    }
  }, [folders, folderIds, setQuickLink, last, setLast])

  const handleStateChnage = useCallback(async (state: AppStateStatus) => {
    if (state === 'active') {
      console.log('check')
      const clipboard = await Clipboard.getString()
      console.log(clipboard)
      checkClipboard()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleStateChnage)
    return () => {
      subscription.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    checkClipboard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderIds])

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
        {folderIds.length < 6 && <FolderAdd />}
      </FolderListView>
    </FolderListScrollView>
  )
}

export default FolderList
