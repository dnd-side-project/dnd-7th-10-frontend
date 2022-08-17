import React, { useMemo, useState } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import Input from '../components/Common/Input'
import { backgroundWithColor } from '../styles/backgrounds'
import SectionTitle from '../components/Common/SectionTitle'
import SectionContent from '../components/Common/SectionContent'
import FolderSelectList from '../components/LinkAdd/FolderSelectList'
import TagGuide from '../components/LinkAdd/TagGuide'
import TagList from '../components/Common/TagList'
import { useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from './Router'
import BottomButton from '../components/Common/BottomButton'
import Button from '../components/Common/Button'

const LinkAddPageView = styled.View`
  ${backgroundWithColor('gray_1')}
  flex: 1;
`

const LinkContentScroll = styled.ScrollView`
  flex: 1;
`

const LinkAddContentView = styled.View`
  ${backgroundWithColor('gray_1')}
  padding: 0 24px;
  flex: 1;
`

interface InputViewProps {
  disabled: boolean
}

const LinkAddInputView = styled.View<InputViewProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: white;
  z-index: 999;
  justify-content: center;
  padding: 0 24px;
  display: ${props => (props.disabled ? 'none' : 'flex')};
`

const LinkAdd = () => {
  const navigation = useNavigation<RouterNavigationProps>()
  const [isInputShow, setIsInputShow] = useState<boolean>(false)

  const isCreatable = useMemo(() => true, [])

  const onPress = () => {}

  const onTagAddPress = () => {
    setIsInputShow(true)
  }

  const onTagClosePress = () => {
    setIsInputShow(false)
  }

  const onFolderAddPress = () => {
    navigation.navigate('FolderAdd')
  }

  return (
    <LinkAddPageView>
      <Header>링크추가</Header>
      <LinkContentScroll>
        <LinkAddContentView>
          <SectionTitle title="링크 URL" />
          <SectionContent>
            <Input />
          </SectionContent>
          <SectionTitle
            title="저장할 폴더 선택"
            plus
            onPlusPress={onFolderAddPress}
          />
          <SectionContent>
            <FolderSelectList />
          </SectionContent>
          <SectionTitle title="태그 선택" plus onPlusPress={onTagAddPress} />
          <SectionContent>
            <TagGuide />
            <TagList />
          </SectionContent>
        </LinkAddContentView>
        <BottomButton>
          <Button disabled={!isCreatable} onPress={onPress}>
            링크를 담을 폴더 생성하기
          </Button>
        </BottomButton>
      </LinkContentScroll>
      <LinkAddInputView disabled={!isInputShow}>
        <Input small disabled={!isInputShow} onEnterPress={onTagClosePress} />
      </LinkAddInputView>
    </LinkAddPageView>
  )
}

export default LinkAdd
