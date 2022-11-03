import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import { IIconButton } from '../components/Common/Header'
import {
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData
} from 'react-native'
import { ColorPalette, Typo } from '../styles/variable'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'
import api from '../lib/api'
import useHeaderEvent from '../hooks/useHeaderEvent'
import { backgroundWithColor } from '../styles/backgrounds'
import useToast, { createWarnToast } from '../hooks/useToast'
import { IMemo } from '../recoil/folders'
import { StackActions } from '@react-navigation/native'

const MemoMainView = styled.View`
  background-color: '#f5f5f5';
  flex: 1;
`

const MemoCardsView = styled.View`
  display: flex;
  /* background: #ffffff; */
`

const MemoContent = styled.Text`
  color: ${ColorPalette.BlueGray_5};
  font-family: ${Typo.Body2_600};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
  ${backgroundWithColor('White')}
`

const MemoCardView = styled.View`
  box-sizing: border-box;
  padding: 24px;
  ${backgroundWithColor('White')}
`

const MemoCardInput = styled.TextInput<{ height?: number }>`
  color: ${ColorPalette.BlueGray_5};
  font-family: ${Typo.Body2_600};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
  height: ${props => (props.height || 320) + 'px'};
  min-height: 320px;
  border: 1px solid #d6e1ed;
  ${backgroundWithColor('Background_1')}
  border-radius: 4px;
  padding: 16px;
`

const MemoLengthText = styled.Text`
  ${Typo.Detail1_400}
  color: ${ColorPalette.BlueGray_3};
  margin-top: 16px;
  align-self: flex-end;
`

const MemoTextLength = styled.Text<{ exceed?: boolean }>`
  color: ${props =>
    props.exceed ? ColorPalette.system_red : ColorPalette.BlueGray_5};
`

const UrlView = styled.View`
  height: 98px;
  border-radius: 0px;
  width: 414px;
  margin-top: 4px;
  ${backgroundWithColor('White')}
`

const UrlImg = styled.Image`
  position: absolute;
  left: 5.8%;
  right: 78.26%;
  top: 16.33%;
  bottom: 16.33%;

  border: 1px solid ${ColorPalette.BlueGray_2};
  border-radius: 38px;
`
const UrlFolder = styled.Text`
  position: absolute;
  left: 25.6%;
  top: 16.33%;
  bottom: 65.31%;

  font-family: ${Typo.Detail2_400};
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.6px;

  color: ${ColorPalette.BlueGray_4};
`

const UrlTitleComponent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  position: absolute;
  width: 236px;
  height: 27px;
  left: 106px;
  top: 34px;
`
const UrlTitle = styled.Text`
  height: 27px;
  font-family: ${Typo.Heading3_600};
  font-size: 18px;
  line-height: 27px;

  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4};
`
const UrlDate = styled.Text`
  position: absolute;
  left: 25.6%;
  top: 70.41%;
  bottom: 11.22%;

  font-family: ${Typo.Detail2_400};
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_3};
`

const iconButtons: IIconButton[] = [
  // {
  //   name: 'trash',
  //   source: require('../assets/images/trash.png')
  // },
  // {
  //   name: 'edit',
  //   source: require('../assets/images/edit.png')
  // }
]

interface Props {
  articleId?: string
  content?: string
  memoId?: string
}

const MemoPage = ({
  route,
  navigation
}: NativeStackScreenProps<RouterParamList, 'AddMemoPage'>) => {
  const { article } = route.params
  const inputRef = useRef<TextInput | null>(null)
  const showToast = useToast()
  const [edit, setEdit] = useState(true)
  const [text, setText] = useState('')
  const [height, setHeight] = useState(320)

  const postMemo = ({ articleId, content }: Props) => {
    api
      .post<IMemo>('/memo', {
        articleId,
        content
      })
      .then(response => {
        if (response.status === 200) {
          navigation.dispatch(
            StackActions.replace('MemoPage', {
              memo: response.data
            })
          )
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus())
    }
  }, [])

  const { addEventListener, removeEventListener } = useHeaderEvent()

  const handleContentSizeChange = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const newHeight = Math.max(320, event.nativeEvent.contentSize.height)
    setHeight(newHeight)
  }

  useEffect(() => {
    if (article === undefined) {
      setEdit(true)
      setText('')
    }
  }, [addEventListener, removeEventListener])

  function handleTextChange(newText: string) {
    if (newText.length > 1000) {
      newText = newText.substring(0, 1000)
      showToast(
        createWarnToast('메모 내용은 최대 1000자 까지 입력 가능합니다.')
      )
    }
    setText(newText)
  }

  return (
    <MemoMainView>
      <Header
        iconButtons={edit ? undefined : iconButtons}
        save={edit ? true : false}
        onSavePress={() => {
          postMemo({ articleId: article?.id, content: text })
          setEdit(false)
        }}
      >
        메모
      </Header>
      <ScrollView style={{ flex: 1 }} scrollEnabled={true}>
        <MemoCardsView>
          <MemoCardView>
            {edit ? (
              <>
                <MemoCardInput
                  multiline
                  ref={inputRef}
                  defaultValue={text}
                  textAlignVertical={'top'}
                  onChangeText={handleTextChange}
                  height={height}
                  value={text}
                  onContentSizeChange={handleContentSizeChange}
                />
                <MemoLengthText>
                  1000/
                  <MemoTextLength exceed={text.length >= 1000}>
                    {text.length}
                  </MemoTextLength>
                </MemoLengthText>
              </>
            ) : (
              <MemoContent>{text}</MemoContent>
            )}
          </MemoCardView>
          <UrlView>
            <UrlImg
              source={{
                uri:
                  article?.openGraph.linkImage ||
                  'https://via.placeholder.com/120x120'
              }}
            />
            <UrlFolder>{article?.folderTitle}</UrlFolder>
            <UrlTitleComponent>
              <UrlTitle numberOfLines={1}>
                {article?.openGraph.linkTitle}
              </UrlTitle>
            </UrlTitleComponent>
            <UrlDate>{article?.registerDate.split('T')[0]}</UrlDate>
          </UrlView>
        </MemoCardsView>
      </ScrollView>
    </MemoMainView>
  )
}

export default MemoPage
