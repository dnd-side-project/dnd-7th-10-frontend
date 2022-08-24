import React, { useCallback, useEffect, useMemo } from 'react'
import styled from '@emotion/native'
// import FolderCardList from '../components/FolderContent/FolderCardList'
import Header, { IIconButton } from '../components/Common/Header'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'
import useFolderDetail from '../hooks/useFolderDetail'
import FolderCardList from '../components/FolderContent/FolderCardList'
import useHeaderEvent from '../hooks/useHeaderEvent'

const FolderDescView = styled.View`
  flex: 1;
`

const FolderContent = ({
  route,
  navigation
}: NativeStackScreenProps<RouterParamList, 'FolderContent'>) => {
  const iconButtons: IIconButton[] = [
    {
      name: 'folder-content-search',
      source: require('../assets/images/search.png')
    },
    {
      name: 'folder-content-link',
      source: require('../assets/images/link.png')
    }
  ]

  const { folderId } = route.params

  const {
    isLoading,
    isError,
    recoilValue: folderDetail,
    refresh
  } = useFolderDetail(folderId, true)

  const folderTitle = useMemo(() => {
    if (isLoading) {
      return ''
    }
    if (isError) {
      return '폴더를 불러올 수 없습니다.'
    }
    return folderDetail.folderTitle
  }, [isLoading, isError, folderDetail])

  const onFocus = useCallback(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    navigation.addListener('focus', onFocus)
    return () => {
      navigation.removeListener('focus', onFocus)
    }
  }, [onFocus, navigation])

  const onClick = useCallback(
    (name: string) => {
      if (name === 'folder-content-link') {
        navigation.navigate('LinkAdd', { folderId })
      }
    },
    [navigation, folderId]
  )

  const { addEventListener, removeEventListener } = useHeaderEvent()

  useEffect(() => {
    addEventListener(onClick)
    return () => {
      removeEventListener(onClick)
    }
  }, [addEventListener, removeEventListener, onClick])

  return (
    <FolderDescView>
      <Header iconButtons={iconButtons}>{folderTitle}</Header>
      {!isLoading && <FolderCardList folderId={folderId} refresh={refresh} />}
    </FolderDescView>
  )
}

export default FolderContent
