import React from 'react'
import styled from '@emotion/native'
import { Typo } from '../../styles/variable'
import { fontWithColor } from '../../styles/fonts'
import { backgroundWithColor } from '../../styles/backgrounds'
import Card from '../Common/Card'

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
  margin-bottom: 60px;
`

const NoticeAccentText = styled.Text`
  ${fontWithColor('main_1')}
`

const NoticeContent = () => {
  return (
    <NoticeContentView>
      <NoticeText>
        수아님 반가워요!{'\n'}오늘 읽을
        <NoticeAccentText>링크</NoticeAccentText>를 가져왔어요.
      </NoticeText>
      <Card
        title="Developer apple"
        description="Apple’s Human Interface Guidelines (HIG) is a compreHIG) is a compreHIG) is a compre"
        tags={['UX/UI', '디자인 레퍼런스', '디자인 레미도', '디자인 레미도2']}
        bookmark
        memo
        favicon={{ uri: 'https://via.placeholder.com/16x16' }}
      />
    </NoticeContentView>
  )
}

export default NoticeContent
