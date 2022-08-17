import React from 'react'
import styled from '@emotion/native'
import { fontWithColorFamily } from '../../styles/fonts'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'

const FolderEmptyView = styled.View`
  ${backgroundWithColor('background_1')}
  ${flexWithAlign('center', 'center')}
  flex:1;
`

const FolderEmptyIcon = styled.Image`
  width: 64px;
  height: 64px;
`

const FolderEmptyText = styled.Text`
  ${fontWithColorFamily('gray_6', 'Regular')}
  font-size: 18px;
  margin: 24px 0;
  text-align: center;
  line-height: 24px;
`

const FolderEmptyButton = styled.TouchableOpacity``

const FolderEmptyButtonText = styled.Text`
  ${backgroundWithColor('gray_5')}
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
}

const Empty = ({ button, onButtonPress, text }: Props) => {
  return (
    <FolderEmptyView>
      <FolderEmptyIcon
        source={require('../../assets/images/link.png')}
        resizeMode="contain"
      />
      <FolderEmptyText>
        {text || "폴더에 저장한 링크가 없어요!{'\n'}링크들을 모아볼까요?"}
      </FolderEmptyText>
      {button && (
        <FolderEmptyButton onPress={onButtonPress}>
          <FolderEmptyButtonText>링크 저장하기</FolderEmptyButtonText>
        </FolderEmptyButton>
      )}
    </FolderEmptyView>
  )
}

export default Empty
