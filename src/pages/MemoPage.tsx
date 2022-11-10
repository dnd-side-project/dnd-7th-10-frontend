import React, { useState, useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import { IIconButton } from '../components/Common/Header'
import {
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  Pressable
} from 'react-native'
import { ColorPalette, Typo } from '../styles/variable'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'
import api from '../lib/api'
import useHeaderEvent from '../hooks/useHeaderEvent'
import useModal from '../hooks/useModal'
import { useFocusEffect } from '@react-navigation/native'
import { BackHandler } from 'react-native'
import useToast, { createCheckToast, createWarnToast } from '../hooks/useToast'
import { IMemo } from '../recoil/folders'
import { backgroundWithColor } from '../styles/backgrounds'
import { useResetRecoilState } from 'recoil'
import { modalStateAtom } from '../recoil/global'
import SVG from '../assets/images/svg'

const MemoMainView = styled.View`
  background-color: '#f5f5f5';
  flex: 1;
`

const MemoCardsView = styled.View`
  display: flex;
`

const MemoContent = styled.Text`
  color: ${ColorPalette.BlueGray_5};
  font-family: ${Typo.Body2_600};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
  border: 1px solid #d6e1ed;
  ${backgroundWithColor('Background_1')}
  border-radius: 4px;
  padding: 16px;
  min-height: 320px;
`

const MemoCardView = styled.View`
  box-sizing: border-box;
  padding: 24px;
  ${backgroundWithColor('White')}
`
const UrlView = styled.View`
  height: 98px;
  width: 414px;
  border-radius: 0px;
  background: #ffffff;
  margin-top: 4px;
`

const UrlImg = styled.Image`
  position: absolute;
  left: 5.8%;
  right: 78.26%;
  top: 16.33%;
  bottom: 16.33%;

  width: 64px;
  height: 64px;

  border: 1px solid ${ColorPalette.BlueGray_2};
  border-radius: 38px;
`
const UrlFolder = styled.Text`
  position: absolute;
  left: 25.6%;
  top: 16.33%;
  bottom: 65.31%;
  max-width: 40%;

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
  bottom: 16px;

  font-family: ${Typo.Detail2_400};
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_3};
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
const MemoGap = styled.View`
  height: 66px;
`

const iconButtons: IIconButton[] = [
  {
    name: 'memo_trash',
    source: require('../assets/images/trash.png')
  },
  {
    name: 'memo_edit',
    source: require('../assets/images/edit.png')
  }
]

interface Props {
  memoId?: string
  memoContent?: string
}

const chevronStyle = { marginLeft: 8 }

const MemoPage = ({
  route,
  navigation
}: NativeStackScreenProps<RouterParamList, 'MemoPage'>) => {
  const { memo } = route.params
  const { id, articleId, folderTitle, content, openGraph, registerDate } = memo
  const { linkTitle, linkImage } = openGraph!
  const date = registerDate.split('T')[0]
  const inputRef = useRef<TextInput | null>(null)

  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(content)
  const [height, setHeight] = useState(320)
  const [remove, setRemove] = useState(false)
  const resetModal = useResetRecoilState(modalStateAtom)

  const patchData = { memoId: id, memoContent: text }
  const { showModal } = useModal()
  const showToast = useToast()

  const patchMemo = ({ memoId, memoContent }: Props) => {
    api
      .patch<IMemo>(`/memo/${memoId}`, memoContent, {
        headers: {
          'Content-Type': 'text/plain'
        }
      })
      .then(response => {
        if (response.status === 200) {
          showToast(createCheckToast('수정 되었습니다.'))
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
  })

  const removeMemo = ({ memoId }: Props) => {
    api
      .delete<IMemo>(`/memo/${memoId}`)
      .then(response => {
        if (response.status === 200) {
          navigation.goBack()
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
  const onClick = useCallback(
    (name: string) => {
      if (name === 'memo_edit') {
        setEdit(true)
      }
      if (name === 'memo_trash') {
        setRemove(true)
        showModal(
          '해당 메모를 삭제하시겠어요?',
          '작성하신 메모를 삭제하면\n다신 이 메모를 확인해 볼 수 없어요!',
          '삭제할래요',
          '수정할래요'
        ).then(value => {
          if (value) {
            removeMemo({ memoId: id })
          } else {
            setEdit(true)
          }
          setRemove(false)
        })
      }
    },
    [id]
  )
  const { addEventListener, removeEventListener } = useHeaderEvent()

  useEffect(() => {
    addEventListener(onClick)
    return () => {
      removeEventListener(onClick)
    }
  }, [addEventListener, onClick, removeEventListener])

  const exitBehavior = () => {
    if (edit) {
      showModal(
        '지금 나가면 저장되지 않아요!',
        '지금 페이지에서 이동하면\n편집하신 메모 내용이 저장되지 않아요.',
        '네, 나갈래요',
        '다시 돌아갈래요'
      ).then(value => {
        if (value) {
          navigation.goBack()
        }
      })
    } else if (remove) {
      resetModal()
      setRemove(false)
    } else {
      navigation.goBack()
    }
  }

  function handleTextChange(newText: string) {
    if (newText.length > 1000) {
      newText = newText.substring(0, 1000)
      showToast(
        createWarnToast('메모 내용은 최대 1000자 까지 입력 가능합니다.')
      )
    }
    setText(newText)
  }

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        exitBehavior()
        return true
      }

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      )
      return () => subscription.remove()
    }, [edit, remove])
  )

  const onBackPress = () => {
    exitBehavior()
  }

  const handleContentSizeChange = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const newHeight = Math.max(320, event.nativeEvent.contentSize.height)
    setHeight(newHeight)
  }

  function handleLinkPress() {
    if (articleId) {
      navigation.navigate('LinkContents', { articleId })
    } else {
      showToast(createWarnToast('링크 정보를 찾을 수 없습니다.'))
    }
  }

  return (
    <MemoMainView>
      <Header
        iconButtons={edit ? undefined : iconButtons}
        save={edit ? true : false}
        onBackPress={onBackPress}
        onSavePress={() => {
          patchMemo(patchData)
          setEdit(false)
        }}
      >
        메모
      </Header>
      <ScrollView scrollEnabled={true} nestedScrollEnabled={true}>
        <MemoCardsView>
          <MemoCardView>
            {edit ? (
              <KeyboardAvoidingView>
                <MemoCardInput
                  multiline
                  ref={inputRef}
                  defaultValue={text}
                  textAlignVertical={'top'}
                  placeholderTextColor={ColorPalette.BlueGray_3}
                  placeholder={'기억하고 싶은 내용과 생각을 메모해보세요!'}
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
              </KeyboardAvoidingView>
            ) : (
              <MemoContent>{text}</MemoContent>
            )}
          </MemoCardView>
          <UrlView>
            <UrlImg
              source={
                linkImage
                  ? {
                      uri: linkImage
                    }
                  : require('../assets/images/cover_small.png')
              }
            />
            <UrlFolder numberOfLines={1}>{folderTitle}</UrlFolder>
            <UrlTitleComponent>
              <UrlTitle numberOfLines={1}>{linkTitle}</UrlTitle>
              <Pressable onPress={handleLinkPress}>
                <SVG.ChevronRight
                  stroke={ColorPalette.BlueGray_4}
                  style={chevronStyle}
                />
              </Pressable>
            </UrlTitleComponent>
            <UrlDate>{date}</UrlDate>
          </UrlView>
        </MemoCardsView>
        <MemoGap />
      </ScrollView>
    </MemoMainView>
  )
}

export default MemoPage
