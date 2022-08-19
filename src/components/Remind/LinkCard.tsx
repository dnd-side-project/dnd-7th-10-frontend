import React from 'react'
import styled from '@emotion/native'

const LinkCardView = styled.View``
const LinkImage = styled.Image``

export interface IOG {
  linkTitle: string
  linkDescription: string
  linkImage: string
}

export interface ILink {
  id: string
  remindId: null | string
  linkUrl: string
  openGraph: IOG
  memos: object[]
  tags: object[]
  registerDate: string
  modifiedDate: string
  bookmark: boolean
}

interface Props {
  link: ILink
}
const LinkCard = ({ link }: Props) => {
  const { linkUrl } = link
  return (
    <LinkCardView>
      <LinkImage source={{ uri: linkUrl }} />
    </LinkCardView>
  )
}

export default LinkCard
