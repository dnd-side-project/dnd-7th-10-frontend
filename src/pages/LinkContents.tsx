import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import TagBar from '../components/TagBar'
import LinkContent from '../components/LinkContent'
import MemoContent from '../components/MemoContent'
import { IIconButton } from '../components/Common/Header'

const LinkView = styled.View``
const link_1 = {
  img: '../asset/image/link_desc_thumbnail.png',
  content:
    'Apple’s Human Interface Guidelines (HIG) is a comprehensive resource for designers and developers looking to create great experiences across Apple platforms. Now, it’s been fully redesigned and refreshed to meet your needs — from your first sketch to the final pixel.',
  title: 'Developer Apple',
  date: '2022.08.01',
  url: ''
}

const tags = ['UX/UI', '브랜딩', '브랜딩브랜딩']

const LinkContents = () => {
  const iconButtons: IIconButton[] = [
    {
      name: 'edit',
      source: require('../assets/images/icon_edit.png'),
      onPress: () => console.log('edit')
    }
  ]

  return (
    <LinkView>
      <Header iconButtons={iconButtons}>링크 정보</Header>
      <LinkContent link={link_1} />
      <TagBar tags={tags} />
      <MemoContent />
    </LinkView>
  )
}

export default LinkContents
