import React, { useMemo, useState } from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'
import { IArticle } from '../../recoil/folders'
import { fontWithColor } from '../../styles/fonts'
import SVG from '../../assets/images/svg'
import { backgroundWithColor } from '../../styles/backgrounds'
import Clipboard from '@react-native-clipboard/clipboard'
// import useToast, { createCheckToast } from '../../hooks/useToast'

const LinkView = styled.View`
  ${backgroundWithColor('White')}
`

const LinkImage = styled.Image`
  width: 100%;
  height: 260px;
`

const LinkContentView = styled.View`
  padding: 24px 24px 32px;
  overflow: hidden;
  position: relative;
`

const LinkTitle = styled.Text`
  ${fontWithColor('BlueGray_5')}
  ${Typo.Heading1_600}
  margin-bottom: 18px;
  line-height: 32px;
  overflow: hidden;
`

const LinkText = styled.Text`
  ${fontWithColor('BlueGray_5')}
  ${Typo.Body2_600}
  line-height: 20px;
  overflow: hidden;
`

const LinkBottomView = styled.View`
  width: 100%;
  height: 30px;
  margin-top: 40px;
  flex-direction: row;
  justify-content: space-between;
`

const LinkButtonView = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
`

const LinkDate = styled.Text`
  ${fontWithColor('LinkkleBlueGray')}
  ${Typo.Body3_600}
`

const LinkBookmark = styled.TouchableOpacity``

const LinkChain = styled.TouchableOpacity`
  margin-left: 24px;
`

const LinkUrlView = styled.View`
  flex-direction: column;
  height: 40px;
  text-align: center;
  padding: 0 24px;
  position: absolute;
  right: 16px;
  bottom: 72px;
  ${backgroundWithColor('background_1')};
  border-radius: 4px;
  border: 1px solid ${ColorPalette.LinkkleLightBlueGray};
`

const LinkUrlText = styled.Text`
  ${Typo.Body2_600}
  color: ${ColorPalette.BlueGray_4};
  line-height: 38px;
`

const LinkUrlTriangle = styled.Image`
  width: 10px;
  height: 8px;
  align-self: flex-end;
  margin-right: -8px;
  /* position: absolute; */
`

interface Props {
  article: IArticle
  onBookmarkPress: () => void
}

const LinkContent = ({ article, onBookmarkPress }: Props) => {
  const date = article.registerDate.split('T')[0].split('-').join('.')
  // const showToast = useToast()
  const [showLink, setShowLink] = useState<boolean>(false)

  const image = useMemo(() => {
    const source = article.openGraph.linkImage
    if (!source) {
      return require('../../assets/images/cover.png')
    }
    let uri = source
    if (source.startsWith('//')) {
      uri = 'https:' + uri
    }
    return {
      uri
    }
  }, [])

  const handleLinkClick = () => {
    Clipboard.setString(article.linkUrl)
    // showToast(createCheckToast(article.linkUrl))
    setShowLink(true)
    setTimeout(() => {
      setShowLink(false)
    }, 3000)
  }

  return (
    <LinkView>
      <LinkImage source={image} resizeMode="cover" />
      <LinkContentView>
        <LinkTitle numberOfLines={5}>
          {article.openGraph.linkTitle || '제목 없음'}
        </LinkTitle>
        <LinkText numberOfLines={5}>
          {article.openGraph.linkDescription}
        </LinkText>
        <LinkBottomView>
          <LinkDate>{date}</LinkDate>
          <LinkButtonView>
            <LinkBookmark onPress={onBookmarkPress}>
              {article.bookmark ? (
                <SVG.BookmarkFilled stroke={ColorPalette.LinkkleBlueGray} />
              ) : (
                <SVG.Bookmark stroke={ColorPalette.LinkkleBlueGray} />
              )}
            </LinkBookmark>
            <LinkChain onPress={handleLinkClick}>
              <SVG.Link stroke={ColorPalette.LinkkleBlueGray} />
            </LinkChain>
          </LinkButtonView>
        </LinkBottomView>
        {showLink && (
          <LinkUrlView>
            <LinkUrlText numberOfLines={1}>{article.linkUrl}</LinkUrlText>
            <LinkUrlTriangle
              source={require('../../assets/images/triangle.png')}
              resizeMode="stretch"
            />
          </LinkUrlView>
        )}
      </LinkContentView>
    </LinkView>
  )
}

export default LinkContent
