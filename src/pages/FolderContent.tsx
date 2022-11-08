import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/native'
import { BackHandler } from 'react-native'
// import FolderCardList from '../components/FolderContent/FolderCardList'
import Header, { IIconButton } from '../components/Common/Header'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'
import useFolderDetail from '../hooks/useFolderDetail'
import FolderCardList from '../components/FolderContent/FolderCardList'
import useHeaderEvent from '../hooks/useHeaderEvent'
import { backgroundWithColor, shadow } from '../styles/backgrounds'
import { ColorPalette, Typo } from '../styles/variable'
import useModal from '../hooks/useModal'
import { useFocusEffect } from '@react-navigation/native'
import { useResetRecoilState } from 'recoil'
import { modalStateAtom } from '../recoil/global'
import api from '../lib/api'
import useToast, { createCheckToast, ToastOffset } from '../hooks/useToast'
import useFolderList from '../components/Home/FolderList.hook'

const FolderDescView = styled.View`
  flex: 1;
`

const DropdownArea = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

const DropdownMenu = styled.View`
  width: 144px;
  ${backgroundWithColor('background_1')}
  position: absolute;
  right: 32px;
  top: 62px;
  z-index: 999;
  margin-bottom: -2px;
`

const DropdownTouchable = styled.TouchableOpacity``

const DropdownItem = styled.Text`
  width: 100%;
  height: 60px;
  ${Typo.Heading3_600};
  color: ${ColorPalette.BlueGray_4};
  ${backgroundWithColor('White')};
  text-align: center;
  line-height: 60px;
  margin-bottom: 2px;
`

const FolderContent = ({
  route,
  navigation
}: NativeStackScreenProps<RouterParamList, 'FolderContent'>) => {
  const iconButtons: IIconButton[] = [
    // {
    //   name: 'folder-content-search',
    //   source: require('../assets/images/fc_search.png')
    // },
    {
      name: 'folder-content-link',
      source: require('../assets/images/fc_link.png')
    },
    {
      name: 'folder-content-more',
      source: require('../assets/images/more.png')
    }
  ]

  const showToast = useToast()
  const [, fetchFolders] = useFolderList()
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const [modalShow, setModalShow] = useState<boolean>(false)
  const resetModal = useResetRecoilState(modalStateAtom)
  const { showModal } = useModal()

  const { folderId } = route.params

  const {
    isLoading,
    isError,
    recoilValue: folderDetail,
    refresh
  } = useFolderDetail(folderId, true)

  const folderTitle = useMemo(() => {
    if (isError) {
      return '폴더를 불러올 수 없습니다.'
    }
    return folderDetail?.folderTitle || ''
  }, [isLoading, isError, folderDetail])

  const onFocus = useCallback(() => {
    refresh(true)
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
      } else if (name === 'folder-content-more') {
        setMenuVisible(value => !value)
      }
    },
    [navigation, folderId]
  )

  const { addEventListener, removeEventListener } = useHeaderEvent()

  const handleDeletePress = () => {
    setMenuVisible(false)
    setModalShow(true)
    showModal(
      '해당 폴더를 삭제하시겠어요?',
      '폴더 내 모든 콘텐츠도 함께 삭제됩니다.\n정말 삭제하시겠어요?',
      '삭제할래요',
      '취소할래요'
    )
      .then(value => {
        if (value) {
          deleteFolder()
        }
      })
      .catch()
      .finally(() => {
        setModalShow(false)
      })
  }

  const deleteFolder = () => {
    api
      .delete(`/folder/${folderId}`)
      .then(() => {
        fetchFolders()
        showToast(
          createCheckToast(
            '폴더와 컨텐츠를 모두 삭제했어요!',
            ToastOffset.BottomTab
          )
        )
        navigation.goBack()
      })
      .catch(e => {
        console.error(e)
        console.error('failed to delete folder')
      })
  }

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (modalShow) {
          resetModal()
        } else {
          navigation.goBack()
        }
        return true
      }

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      )
      return () => {
        setMenuVisible(false)
        subscription.remove()
      }
    }, [modalShow])
  )

  const handleEditPress = () => {
    setMenuVisible(false)
    navigation.navigate('FolderEdit', {
      folderId
    })
  }

  useEffect(() => {
    addEventListener(onClick)
    return () => {
      removeEventListener(onClick)
    }
  }, [addEventListener, removeEventListener, onClick])

  return (
    <FolderDescView>
      <Header iconButtons={iconButtons}>{folderTitle}</Header>
      <FolderCardList folderId={folderId} refresh={refresh} />
      {menuVisible && (
        <DropdownArea onPress={() => setMenuVisible(false)}>
          <DropdownMenu style={shadow}>
            <DropdownTouchable onPress={handleDeletePress}>
              <DropdownItem>폴더 삭제하기</DropdownItem>
            </DropdownTouchable>
            <DropdownTouchable onPress={handleEditPress}>
              <DropdownItem>폴더 수정하기</DropdownItem>
            </DropdownTouchable>
          </DropdownMenu>
        </DropdownArea>
      )}
    </FolderDescView>
  )
}

export default FolderContent
