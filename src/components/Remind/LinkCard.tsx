import React from 'react'
import styled from '@emotion/native'
import Tag from '../Common/Tag'
const LinkCardView = styled.View``
const LinkImage = styled.Image``

export interface tag {
  tagName: string
  tagId: string
}
interface TagList extends Array<tag> {}

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
  tags: TagList
  registerDate: string
  modifiedDate: string
  bookmark: boolean
}

interface Props {
  link: ILink
}

const LinkCard = ({ link }: Props) => {
  const { linkUrl, tags } = link
  return (
    <LinkCardView>
      <LinkImage source={{ uri: linkUrl }} />
      {tags.map(tag => (
        <Tag text={tag.tagName} />
      ))}
    </LinkCardView>
  )
}

export default LinkCard
