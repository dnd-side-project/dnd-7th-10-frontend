import styled from '@emotion/native'
import React from 'react'
import { backgroundWithColor } from '../../styles/backgrounds'
import { fontWithColorFamily } from '../../styles/fonts'

const FolderCardView = styled.View`
  ${backgroundWithColor('gray_1')}
  border-radius: 8px;
  elevation: 6;
  shadow-opacity: 0.8;
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

const FolderCard = () => {
  return (
    <FolderCardView>
      <FolderCardImage
        source={{
          uri: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F24283C3858F778CA2EFABE'
        }}
        resizeMode="cover"
      />
      <FolderCardContent>
        <ContentTitle>Developer Apple</ContentTitle>
        <ContentDescription numberOfLines={1}>
          Apple's Human Interface Guidelines (HIG) is a compre...
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
