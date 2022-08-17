import styled from '@emotion/native'
import React from 'react'
import { IArticle } from '../../recoil/folders'
import { backgroundWithColor, shadow } from '../../styles/backgrounds'
import { fontWithColorFamily } from '../../styles/fonts'

const FolderCardView = styled.View`
  ${backgroundWithColor('gray_1')}
  border-radius: 8px;
  margin-bottom: 12px;
`

const FolderCardImage = styled.Image`
  height: 140px;
  border-radius: 8px 8px 0 0;
`

const FolderCardContent = styled.View`
  padding: 16px;
`

const ContentTitle = styled.Text`
  ${fontWithColorFamily('gray_8', 'SemiBold')}
  font-size: 18px;
`

const ContentDescription = styled.Text`
  ${fontWithColorFamily('gray_6', 'Regular')}
  font-size: 14px;
  margin: 6px 0 14px;
`

const ContentTagView = styled.View`
  flex-direction: row;
`

const ContentTag = styled.Text`
  ${fontWithColorFamily('gray_1', 'SemiBold')}
  ${backgroundWithColor('gray_5')}
  height: 25px;
  border-radius: 30px;
  line-height: 25px;
  font-size: 14px;
  padding: 0 8px;
  margin-right: 8px;
`

interface Props {
  article: IArticle
}

const FolderCard = ({ article }: Props) => {
  return (
    <FolderCardView style={shadow}>
      <FolderCardImage
        source={{
          uri: article.openGraph.linkImage
        }}
        resizeMode="cover"
      />
      <FolderCardContent>
        <ContentTitle>{article.openGraph.linkTitle}</ContentTitle>
        <ContentDescription numberOfLines={1}>
          {article.openGraph.linkDescription}
        </ContentDescription>
        <ContentTagView>
          <ContentTag>UI/UX</ContentTag>
          <ContentTag>브랜딩</ContentTag>
        </ContentTagView>
      </FolderCardContent>
    </FolderCardView>
  )
}

export default FolderCard
