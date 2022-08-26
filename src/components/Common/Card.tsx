import React from 'react'
import styled from '@emotion/native'
import { ImageSourcePropType } from 'react-native'
import { backgroundWithColor, shadow } from '../../styles/backgrounds'
import { ColorPalette, Typo } from '../../styles/variable'
import { fontWithColor } from '../../styles/fonts'
import { flexWithAlign } from '../../styles/flexbox'
import SVG from '../../assets/images/svg'
import { useMemo } from 'react'

export const defaultSource = { uri: 'https://via.placeholder.com/1200x630' }

export const CardView = styled.View`
  align-self: stretch;
  align-items: stretch;
  border-radius: 8px;
  overflow: hidden;
`
export const CardCoverImage = styled.Image`
  height: 140px;
`

export const CardCoverOverlay = styled.View`
  background: rgba(0, 0, 0, 0.2);
  height: 140px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`

export const CardContent = styled.View`
  ${backgroundWithColor('White')}
  padding: 10px 16px 16px;
`

const CardTitleText = styled.Text`
  ${Typo.Heading3_600}
  ${fontWithColor('BlueGray_5')}
`

const CardDescriptionText = styled.Text`
  ${Typo.Detail2_400}
  ${fontWithColor('BlueGray_4')}
  margin-top: 10px;
`

export const CardTagList = styled.View`
  ${flexWithAlign('center', 'flex-start', 'row')}
  flex-wrap: wrap;
  overflow: hidden;
  height: 25px;
  margin-top: 16px;
`

export const CardTag = styled.Text`
  ${backgroundWithColor('LinkkleBlueGray')}
  ${Typo.Detail1_400}
  ${fontWithColor('White')}
  border-radius: 30px;
  height: 25px;
  margin-right: 9px;
  padding: 0 8px;
  line-height: 25px;
  max-width: 100px;
`

const CardFavicon = styled.Image`
  width: 28px;
  height: 28px;
  position: absolute;
  left: 16px;
  top: 16px;
  border-radius: 14px;
  overflow: hidden;
  border: 2px solid ${ColorPalette.White};
`

const BookmarkTouchable = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  right: 16px;
  top: 16px;
  position: absolute;
`

const MemoTouchable = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  right: 56px;
  top: 16px;
  position: absolute;
`

const InstantTouchable = styled.TouchableOpacity`
  ${flexWithAlign('center', 'center')}
  background: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  width: 86px;
  height: 34px;
  position: absolute;
  right: 16px;
  bottom: 16px;
`

const InstantText = styled.Text`
  ${fontWithColor('BlueGray_4')}
  ${Typo.Button_600}
`

const iconButtonInsets = { top: 8, bottom: 8, left: 8, right: 8 }

interface Props {
  source?: ImageSourcePropType | string
  title: string
  description?: string
  tags?: string[]
  favicon?: ImageSourcePropType
  bookmark?: boolean
  bookmarked?: boolean
  memo?: boolean
  onBookmarkPress?: () => void
  instant?: boolean
  onInstantPress?: () => void
}

const Card = ({
  source,
  title,
  description,
  tags,
  favicon,
  bookmark,
  bookmarked,
  memo,
  onBookmarkPress,
  instant,
  onInstantPress
}: Props) => {
  const image = useMemo(() => {
    if (typeof source === 'string') {
      return {
        uri: source || defaultSource.uri
      }
    }
    return source || defaultSource
  }, [])

  return (
    <CardView style={shadow}>
      <CardCoverImage source={image} resizeMode="cover" />
      <CardCoverOverlay>
        {instant && (
          <InstantTouchable onPress={onInstantPress}>
            <InstantText>바로 열기</InstantText>
          </InstantTouchable>
        )}
      </CardCoverOverlay>
      {favicon && <CardFavicon source={favicon} resizeMode="contain" />}
      {(bookmark || bookmarked) && (
        <BookmarkTouchable hitSlop={iconButtonInsets} onPress={onBookmarkPress}>
          {bookmarked ? (
            <SVG.BookmarkFilled stroke={ColorPalette.White} />
          ) : (
            <SVG.Bookmark stroke={ColorPalette.White} />
          )}
        </BookmarkTouchable>
      )}
      {memo && (
        <MemoTouchable hitSlop={iconButtonInsets}>
          <SVG.Memo stroke={ColorPalette.White} />
        </MemoTouchable>
      )}
      <CardContent>
        <CardTitleText numberOfLines={1}>{title}</CardTitleText>
        {description && (
          <CardDescriptionText numberOfLines={1}>
            {description}
          </CardDescriptionText>
        )}
        {tags && tags.length > 0 && (
          <CardTagList>
            {tags.map(tag => (
              <CardTag key={tag} numberOfLines={1}>
                {tag}
              </CardTag>
            ))}
          </CardTagList>
        )}
      </CardContent>
    </CardView>
  )
}

export default Card
