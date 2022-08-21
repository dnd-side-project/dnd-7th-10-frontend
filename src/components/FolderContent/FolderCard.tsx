import React, { useMemo } from 'react'
import { IArticle } from '../../recoil/folders'
import Card from '../Common/Card'

interface Props {
  article: IArticle
}

const FolderCard = ({ article }: Props) => {
  const linkImage = useMemo(() => {
    if (article.openGraph.linkImage.startsWith('//')) {
      return `https:${article.openGraph.linkImage}`
    }
    return article.openGraph.linkImage || 'https://via.placeholder.com/1200x630'
  }, [article])

  const tags = useMemo(() => {
    return article.tags.map(({ tagName }) => tagName)
  }, [article])

  return (
    <Card
      title={article.openGraph.linkTitle}
      description={article.openGraph.linkDescription}
      source={{
        uri: linkImage
      }}
      tags={tags}
    />
  )
}

export default FolderCard
