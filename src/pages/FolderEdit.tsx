import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import SectionTitle from '../components/Common/SectionTitle'
import SectionContent from '../components/Common/SectionContent'
import Input from '../components/Common/Input'
import { backgroundWithColor } from '../styles/backgrounds'
import FolderColorList from '../components/FolderAdd/FolderColorList'
import BottomButton from '../components/Common/BottomButton'
import Button from '../components/Common/Button'
import api from '../lib/api'
import useFolderList from '../components/Home/FolderList.hook'
import { useNavigation } from '@react-navigation/native'
import useToast, {
  createCheckToast,
  createWarnToast,
  ToastOffset
} from '../hooks/useToast'
import useFolderDetail from '../hooks/useFolderDetail'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'

const FolderEditView = styled.View`
  flex: 1;
`

const FolderEditList = styled.ScrollView`
  ${backgroundWithColor('gray_1')}
  flex: 1;
`

const FolderEditContent = styled.View`
  ${backgroundWithColor('gray_1')}
  padding: 0 24px;
  height: 100%;
  flex: 1;
`

interface IFolderPost {
  folderColor: string
  folderId: string
  folderTitle: string
}

const contentContainer = { flexGrow: 1 }

const FolderEdit = ({
  route
}: NativeStackScreenProps<RouterParamList, 'FolderEdit'>) => {
  const folderId = route.params?.folderId || ''
  const [folderTitle, setFolderTitle] = useState<string>('')
  const [folderColor, setFolderColor] = useState<string>('navy')
  const [folders, fetchFolders] = useFolderList()
  const { recoilValue: folderDetail } = useFolderDetail(folderId, true)
  const navigation = useNavigation()
  const showToast = useToast()

  const isCreatable = useMemo(() => {
    return folderTitle.trim().length > 0 && folderColor
  }, [folderColor, folderTitle])

  const onChangeText = useCallback((text: string) => {
    setFolderTitle(text)
  }, [])

  useEffect(() => {
    if (folderDetail) {
      setFolderTitle(folderDetail.folderTitle)
      setFolderColor(folderDetail.folderColor)
    }
  }, [folderDetail])

  useEffect(() => {
    if (folders.length >= 6) {
      showToast(
        createWarnToast(
          '폴더는 최대 6개 까지 생성 가능합니다.',
          ToastOffset.BottomTab
        )
      )
      navigation.goBack()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onPress() {
    const trimmedTitle = folderTitle.trim()
    if (trimmedTitle.length > 25) {
      showToast(
        createWarnToast(
          '폴더 명 입력은 최대 25자입니다.',
          ToastOffset.BottomTab
        )
      )
      return
    }
    api
      .patch<IFolderPost>(`/folder/${folderId}`, { folderColor, folderTitle })
      .then(response => {
        if (response.status === 200) {
          fetchFolders()
          showToast(
            createCheckToast('폴더 수정을 완료했어요!', ToastOffset.BottomTab)
          )
          console.log({
            folderColor,
            folderTitle
          })
          console.log(response.data)
          navigation.goBack()
        }
      })
      .catch(error => {
        console.error(error)
        showToast(
          createWarnToast('폴더 생성에 실패하였습니다.', ToastOffset.BottomTab)
        )
      })
  }

  return (
    <FolderEditView>
      <Header>폴더 수정하기</Header>
      <FolderEditList contentContainerStyle={contentContainer}>
        <FolderEditContent>
          <SectionTitle title="폴더 명" />
          <SectionContent>
            <Input
              value={folderTitle}
              onChangeText={onChangeText}
              placeholder="폴더 명을 입력해주세요."
            />
          </SectionContent>
          <SectionTitle title="폴더 색상 선택" />
          <SectionContent>
            <FolderColorList
              color={folderColor}
              onColorChange={setFolderColor}
            />
          </SectionContent>
        </FolderEditContent>
        <BottomButton>
          <Button disabled={!isCreatable} onPress={onPress}>
            수정 완료하기
          </Button>
        </BottomButton>
      </FolderEditList>
    </FolderEditView>
  )
}

export default FolderEdit
