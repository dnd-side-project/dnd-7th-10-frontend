import React from 'react'
import styled from '@emotion/native'
import { fontWithColorFamily } from '../../styles/fonts'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import { IColorPalette } from '../../styles/variable'
import { ImageSourcePropType } from 'react-native'

interface EmptyViewProps {
  background?: IColorPalette
}

const FolderEmptyView = styled.View<EmptyViewProps>`
  ${props => backgroundWithColor(props.background || 'background_1')}
  ${flexWithAlign('center', 'center')}
  flex:1;
`

const FolderEmptyIcon = styled.Image`
  width: 64px;
  height: 64px;
`

const FolderEmptyText = styled.Text`
  ${fontWithColorFamily('BlueGray_4', 'Regular')}
  font-size: 18px;
  margin: 24px 0;
  text-align: center;
  line-height: 27px;
`

const FolderEmptyButton = styled.TouchableOpacity``

const FolderEmptyButtonText = styled.Text`
  ${backgroundWithColor('LinkkleDarkBlueGray')}
  ${fontWithColorFamily('gray_1', 'SemiBold')}
  font-size: 15px;
  border-radius: 4px;
  padding: 12px 24px;
  text-align: center;
`

interface Props {
  button?: boolean
  onButtonPress?: () => void
  text?: string
  buttonText?: string
  icon?: boolean
  background?: IColorPalette
  source?: ImageSourcePropType
}

const Empty = ({
  button,
  onButtonPress,
  text,
  buttonText,
  icon,
  background,
  source
}: Props) => {
  return (
    <FolderEmptyView background={background}>
      {icon && (
        <FolderEmptyIcon
          source={source || require('../../assets/images/no_link.png')}
          resizeMode="contain"
        />
      )}
      <FolderEmptyText>
        {text || '폴더에 저장한 링크가 없어요!\n링크들을 모아볼까요?'}
      </FolderEmptyText>
      {button && (
        <FolderEmptyButton onPress={onButtonPress}>
          <FolderEmptyButtonText>
            {buttonText || '링크 저장하기'}
          </FolderEmptyButtonText>
        </FolderEmptyButton>
      )}
    </FolderEmptyView>
  )
}

export default Empty
