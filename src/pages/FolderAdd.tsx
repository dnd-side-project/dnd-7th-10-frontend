import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import SectionTitle from '../components/Common/SectionTitle'
import SectionContent from '../components/Common/SectionContent'
import Input from '../components/Common/Input'
import { backgroundWithColor } from '../styles/backgrounds'
import FolderColorList from '../components/FolderAdd/FolderColorList'

const FolderAddView = styled.View``

const FolderAddContent = styled.View`
  ${backgroundWithColor('gray_1')}
  padding: 0 24px;
`

const FolderAdd = () => {
  return (
    <FolderAddView>
      <Header>폴더 생성하기</Header>
      <FolderAddContent>
        <SectionTitle title="폴더 명" />
        <SectionContent>
          <Input />
        </SectionContent>
        <SectionTitle title="폴더 컬러 선택" />
        <SectionContent>
          <FolderColorList />
        </SectionContent>
      </FolderAddContent>
    </FolderAddView>
  )
}

export default FolderAdd
