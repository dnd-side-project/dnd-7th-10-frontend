import React from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'
import { IArticle } from '../../recoil/folders'
import { fontWithColor } from '../../styles/fonts'
import SVG from '../../assets/images/svg'
import { backgroundWithColor } from '../../styles/backgrounds'

const LinkView = styled.View`
  ${backgroundWithColor('White')}
`

const LinkImage = styled.Image`
  height: 260px;
`

const LinkContentView = styled.View`
  padding: 24px 24px 32px;
  overflow: hidden;
`

const LinkTitle = styled.Text`
  ${fontWithColor('BlueGray_5')}
  ${Typo.Heading1_600}
  margin-bottom: 10px;
`

const LinkText = styled.Text`
  ${fontWithColor('BlueGray_5')}
  ${Typo.Body2_600}
  line-height: 20px;
  margin-bottom: 46px;
`

const LinkBottomView = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
`

const LinkButtonView = styled.View`
  display: flex;
  flex-direction: row;
`

const LinkDate = styled.Text`
  ${fontWithColor('LinkkleBlueGray')}
  ${Typo.Body3_600}
`

const LinkBookmark = styled.TouchableOpacity``

const LinkChain = styled.TouchableOpacity`
  margin-left: 24px;
`

interface Props {
  article: IArticle
}

const LinkContent = ({ article }: Props) => {
  return (
    <LinkView>
      <LinkImage
        source={{
          uri:
            article.openGraph.linkImage ||
            'https://via.placeholder.com/1200x630'
        }}
        resizeMode="cover"
      />
      <LinkContentView>
        <LinkTitle>{article.openGraph.linkTitle}</LinkTitle>
        <LinkText>{article.openGraph.linkDescription}</LinkText>
        <LinkBottomView>
          <LinkDate>{article.registerDate}</LinkDate>
          <LinkButtonView>
            <LinkBookmark>
              <SVG.Bookmark stroke={ColorPalette.LinkkleBlueGray} />
            </LinkBookmark>
            <LinkChain>
              <SVG.Link stroke={ColorPalette.LinkkleBlueGray} />
            </LinkChain>
          </LinkButtonView>
        </LinkBottomView>
      </LinkContentView>
    </LinkView>
  )
}

export default LinkContent
