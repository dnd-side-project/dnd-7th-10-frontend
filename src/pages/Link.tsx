import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Header'
import TagBar from '../components/TagBar'
import LinkContent from '../components/LinkContent'
import MemoContent from '../components/MemoContent'
import { IIconButton } from '../components/Header'

const LinkView = styled.View``

const Link = () => {
  const iconButtons: IIconButton[] = [
    {
      name: 'edit',
      source: require('../assets/images/icon_edit.png'),
      onPress: () => console.log('edit')
    }
  ]

  return (
    <LinkView>
      <Header children={'링크 정보'} iconButtons={iconButtons} />
      <LinkContent />
      <TagBar />
      <MemoContent />
    </LinkView>
  )
}

export default Link
