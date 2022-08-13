import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import Input from '../components/Common/Input'
import { backgroundWithColor } from '../styles/backgrounds'
import SectionTitle from '../components/Common/SectionTitle'
import SectionContent from '../components/Common/SectionContent'
import FolderSelectList from '../components/LinkAdd/FolderSelectList'
import TagGuide from '../components/LinkAdd/TagGuide'
import TagList from '../components/Common/TagList'

const LinkAddPageView = styled.View`
  ${backgroundWithColor('gray_1')}
  flex: 1;
`

const LinkContentScroll = styled.ScrollView`
  flex: 1;
`

const LinkAddContentView = styled.View`
  ${backgroundWithColor('gray_1')}
  padding: 0 24px;
  flex: 1;
`

const LinkAddPage = () => {
  return (
    <LinkAddPageView>
      <Header>링크추가</Header>
      <LinkContentScroll>
        <LinkAddContentView>
          <SectionTitle title="링크 URL" />
          <SectionContent>
            <Input />
          </SectionContent>
          <SectionTitle title="저장할 폴더 선택" plus />
          <SectionContent>
            <FolderSelectList />
          </SectionContent>
          <SectionTitle title="태그 선택" plus />
          <SectionContent>
            <TagGuide />
            <TagList />
          </SectionContent>
        </LinkAddContentView>
      </LinkContentScroll>
    </LinkAddPageView>
  )
}

export default LinkAddPage
