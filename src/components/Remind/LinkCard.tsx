import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'
import { backgroundWithColor, shadow } from '../../styles/backgrounds'

const LinkCardView = styled.View`
  ${backgroundWithColor('White')}
  width: 175px;
  height: 238px;
  box-shadow: ${shadow};
  border-radius: 4px;
  margin-right: 16px;
`
const LinkImage = styled.Image`
  width: 175px;
  height: 120px;
`
const LinkDescView = styled.View`
  padding: 16px;
`
const LinkTitle = styled.Text`
  color: ${ColorPalette.BlueGray_3};
  font-family: ${Typo.Detail1_400};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.6px;
  margin-bottom: 4px;
  overflow: hidden;
`
const LinkDesc = styled.Text`
  font-family: ${Typo.Heading4_600};
  width: 143px;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
  overflow: hidden;
  color: ${ColorPalette.BlueGray_4};
`

const TagBar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 149px;
  height: 25px;
  overflow: hidden;
  margin-top: 16px;
`
const TagComponent = styled.View`
  padding: 4px 8px;
  margin-right: 10px;
  width: 52px;
  height: 25px;
  background-color: #5e7294;
  border-radius: 30px;
  color: #ffffff;
`
const TagText = styled.Text`
  color: white;
`

interface tag {
  tagName: string
  tagId: string
}
interface TagList extends Array<tag> {}

interface IOG {
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

interface TProps {
  text: string
}

const TagView = ({ text }: TProps) => {
  return (
    <TagComponent>
      <TagText>{text}</TagText>
    </TagComponent>
  )
}

const LinkCard = ({ link }: Props) => {
  const { tags, openGraph } = link
  const { linkDescription, linkImage, linkTitle } = openGraph
  return (
    <LinkCardView>
      <LinkImage
        source={{ uri: linkImage || 'https://via.placeholder.com/1200x630' }}
      />
      <LinkDescView>
        <LinkTitle>{linkTitle}</LinkTitle>
        <LinkDesc>{linkDescription}</LinkDesc>
        <TagBar>
          {tags.map((tag, idx) => (
            <TagView text={tag.tagName} key={idx} />
          ))}
        </TagBar>
      </LinkDescView>
    </LinkCardView>
  )
}

export default LinkCard
