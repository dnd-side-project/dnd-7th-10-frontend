import React from 'react'
import styled from '@emotion/native'
import { Text, Image } from 'react-native'
import { ColorPalette } from '../../styles/variable'
import { FontFamily } from '../../styles/variable'

const LinkView = styled.View``

const LinkImage = styled.Image`
  width: 414px;
  height: 260px;
`

const LinkContentView = styled.View`
  padding: 24px;
  height: 240px;
  overflow: hidden;
`

const LinkTitle = styled.Text`
  margin-bottom: 10px;
  font-size: 20px;
  color: ${ColorPalette.gray_8};
  font-family: ${FontFamily.Regular};
  font-weight: 600;
`

const LinkText = styled.Text`
  line-height: 20px;
`

const LinkBottomView = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 24px;
  position: absolute;
  bottom: 0;
`

const LinkButtonView = styled.View`
  display: flex;
  flex-direction: row;
`

const LinkBookmark = styled.TouchableOpacity``

const LinkChain = styled.TouchableOpacity`
  margin-left: 24px;
`

interface ILink {
  date: string
  content: string
  title: string
  img: string
}

interface Props {
  link: ILink
}

const LinkContent = ({ link }: Props) => {
  return (
    <LinkView>
      <LinkImage
        source={require('../assets/images/link_desc_thumbnail.png')}
        resizeMode="contain"
      />
      <LinkContentView>
        <LinkTitle>{link.title}</LinkTitle>
        <LinkText>{link.content}</LinkText>
        <LinkBottomView>
          <Text>{link.date}</Text>
          <LinkButtonView>
            <LinkBookmark>
              <Image source={require('../assets/images/bookmark.png')} />
            </LinkBookmark>
            <LinkChain>
              <Image source={require('../assets/images/icon_link.png')} />
            </LinkChain>
          </LinkButtonView>
        </LinkBottomView>
      </LinkContentView>
    </LinkView>
  )
}

export default LinkContent
