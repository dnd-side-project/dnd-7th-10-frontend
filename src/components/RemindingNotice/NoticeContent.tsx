import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/native'
import { Typo } from '../../styles/variable'
import { fontWithColor } from '../../styles/fonts'
import { backgroundWithColor } from '../../styles/backgrounds'
import Card from '../Common/Card'
import { IArticle } from '../../recoil/folders'
import { ImageSourcePropType } from 'react-native'

const NoticeContentView = styled.View`
  ${backgroundWithColor('White')}
  flex: 1;
  margin-top: 4px;
  align-items: center;
  padding: 40px 24px 0;
`

const NoticeText = styled.Text`
  ${Typo.Heading1_600}
  ${fontWithColor('BlueGray_4')}
  text-align: center;
  margin-bottom: 40px;
`

const NoticeAccentText = styled.Text`
  ${fontWithColor('main_1')}
`

interface Props {
  article: IArticle
}

const NoticeContent = ({ article }: Props) => {
  const [favicon, setFavicon] = useState<ImageSourcePropType | undefined>(
    undefined
  )

  const linkImage = useMemo(() => {
    if (article.openGraph.linkImage.startsWith('//')) {
      return `https:${article.openGraph.linkImage}`
    }
    return article.openGraph.linkImage || 'https://via.placeholder.com/1200x630'
  }, [article])

  const getFaviconUrl = useCallback(() => {
    if (!article.linkUrl) {
      return 'https://..'
    }
    const [protocol, url] = article.linkUrl.split('://')
    const [host] = (url || protocol).split('/')
    return `${protocol}://${host}/favicon.ico`
  }, [article.linkUrl])

  useEffect(() => {
    const uri = getFaviconUrl()
    fetch(uri).then(({ status }) => {
      if (status === 200) {
        setFavicon({
          uri: uri
        })
      }
    })
  }, [getFaviconUrl])

  return (
    <NoticeContentView>
      <NoticeText>
        반가워요!{'\n'}오늘 읽을
        <NoticeAccentText>링크</NoticeAccentText>를 가져왔어요.
      </NoticeText>
      <Card
        title={article.openGraph.linkTitle}
        description={article.openGraph.linkDescription}
        source={linkImage}
        tags={article.tags.map(({ tagName }) => tagName)}
        bookmark
        memo={article.memos.length > 0}
        favicon={favicon}
      />
    </NoticeContentView>
  )
}

export default NoticeContent
