import React, { useCallback, useState } from 'react'
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

const FolderAddView = styled.View`
  flex: 1;
`

const FolderAddContent = styled.View`
  ${backgroundWithColor('gray_1')}
  padding: 0 24px;
  flex: 1;
`

interface IFolderPost {
  folderColor: string
  folderId: string
  folderTitle: string
}

const FolderAdd = () => {
  const [folderTitle, setFolderTitle] = useState<string>('')
  const [folderColor, setFolderColor] = useState<string>('navy')
  const [, fetchFolders] = useFolderList()
  const navigation = useNavigation()

  const onChangeText = useCallback((text: string) => {
    setFolderTitle(text)
  }, [])

  function onPress() {
    api
      .post<IFolderPost>('/folder', { folderColor, folderTitle })
      .then(response => {
        if (response.status === 200) {
          fetchFolders()
          navigation.goBack()
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <FolderAddView>
      <Header>폴더 생성하기</Header>
      <FolderAddContent>
        <SectionTitle title="폴더 명" />
        <SectionContent>
          <Input value={folderTitle} onChangeText={onChangeText} />
        </SectionContent>
        <SectionTitle title="폴더 컬러 선택" />
        <SectionContent>
          <FolderColorList onColorChange={setFolderColor} />
        </SectionContent>
      </FolderAddContent>
      <BottomButton>
        <Button onPress={onPress}>링크를 담을 폴더 생성하기 </Button>
      </BottomButton>
    </FolderAddView>
  )
}

export default FolderAdd
