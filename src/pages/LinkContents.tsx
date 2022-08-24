import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import TagBar from '../components/LinkContent/TagBar'
import LinkContent from '../components/LinkContent/LinkContent'
import MemoContent from '../components/LinkContent/MemoContent'
import { IIconButton } from '../components/Common/Header'
import { backgroundWithColor } from '../styles/backgrounds'

const LinkView = styled.View`
  ${backgroundWithColor('White')}
  flex: 1;
`

const LinkContentScroll = styled.ScrollView`
  flex: 1;
`

const LinkContentView = styled.View`
  flex: 1;
`

const link_1 = {
  img: '../asset/image/link_desc_thumbnail.png',
  content:
    'Apple’s Human Interface Guidelines (HIG) is a comprehensive resource for designers and developers looking to create great experiences across Apple platforms. Now, it’s been fully redesigned and refreshed to meet your needs — from your first sketch to the final pixel.',
  title: 'Developer Apple',
  date: '2022.08.01',
  url: ''
}

const tags = ['UX/UI', '브랜딩', '브랜딩브랜딩']

const containerStyle = { flexGrow: 1 }

const LinkContents = () => {
  const iconButtons: IIconButton[] = [
    {
      name: 'edit',
      source: require('../assets/images/icon_edit.png')
    }
  ]

  return (
    <LinkView>
      <Header iconButtons={iconButtons}>링크 정보</Header>
      <LinkContentScroll contentContainerStyle={containerStyle}>
        <LinkContentView>
          <LinkContent link={link_1} />
          <TagBar tags={tags} />
          <MemoContent />
        </LinkContentView>
      </LinkContentScroll>
    </LinkView>
  )
}

export default LinkContents
