import React from 'react'
import styled from '@emotion/native'
import { Text, Image } from 'react-native'
import { ColorPalette } from '../styles/variable'
import { FontFamily } from '../styles/variable'

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
  color: ${ColorPalette['gray_8']};
  font-family: ${FontFamily['Regular']};
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

const LinkContent = () => {
  return (
    <LinkView>
      <LinkImage
        source={require('../assets/images/link_desc_thumbnail.png')}
        resizeMode="contain"
      />
      <LinkContentView>
        <LinkTitle>Developer apple</LinkTitle>
        <LinkText>
          Apple’s Human Interface Guidelines (HIG) is a comprehensive resource
          for designers and developers looking to create great experiences
          across Apple platforms. Now, it’s been fully redesigned and refreshed
          to meet your needs — from your first sketch to the final pixel.
        </LinkText>
        <LinkBottomView>
          <Text>2022.08.01</Text>
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
