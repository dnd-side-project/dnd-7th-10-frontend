import React, { useState, useCallback, useEffect } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import { IIconButton } from '../components/Common/Header'
import { ScrollView } from 'react-native'
import { ColorPalette, Typo } from '../styles/variable'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'
import api from '../lib/api'
import { IMemo } from '../components/Remind/MemoCard'
import useHeaderEvent from '../hooks/useHeaderEvent'
import useModal from '../hooks/useModal'

const MemoMainView = styled.View`
  background-color: '#f5f5f5';
`

const MemoCardsView = styled.View`
  display: flex;
  align-items: flex-start;
  padding-top: 24px;
  background: #ffffff;
`

const MemoContent = styled.Text`
  color: ${ColorPalette.BlueGray_5};
  font-family: ${Typo.Body2_600};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
`

const MemoCardView = styled.View`
  box-sizing: border-box;
  padding: 16px;
  margin-left: 23px;
  width: 366px;
  height: 320px;
  background-color: ${ColorPalette.Background_1};
  border: 1px solid #d6e1ed;
  border-radius: 4px;
  flex: none;
  flex-grow: 0;
`
const UrlView = styled.View`
  height: 98px;
  border-radius: 0px;
  width: 414px;
  margin-top: 4px;
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

const MemoCardInput = styled.TextInput`
  color: ${ColorPalette.BlueGray_5};
  font-family: ${Typo.Body2_600};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
`

const iconButtons: IIconButton[] = [
  {
    name: 'trash',
    source: require('../assets/images/trash.png')
  },
  {
    name: 'edit',
    source: require('../assets/images/icon_edit.png')
  }
]

interface Props {
  articleId?: string
  content?: string
  memoId?: string
}

const MemoPage = ({
  route
}: NativeStackScreenProps<RouterParamList, 'AddMemoPage'>) => {
  const { article } = route.params
  console.log(article)

  const [edit, setEdit] = useState(true)
  const [text, setText] = useState('')
  const [memo, setMemo] = useState(null)

  const { showModal } = useModal()

  const postMemo = ({ articleId, content }: Props) => {
    api
      .post<IMemo>('/memo', {
        articleId,
        content
      })
      .then(response => {
        if (response.status === 200) {
          console.log('memo', response.data)
          setMemo(response.data)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  const removeMemo = ({ memoId }: Props) => {
    api
      .delete<IMemo>(`/memo/${memoId}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onClick = useCallback(
    (name: string) => {
      if (name === 'edit') {
        setEdit(true)
      }
      if (name === 'trash') {
        showModal(
          '해당 메모를 삭제하시겠어요?',
          `작성하신 메모를 삭제하면
        다신 이 메모를 확인해 볼 수 없어요!`,
          '삭제할래요',
          '수정할래요'
        ).then(value => {
          if (value) {
            setEdit(true)
          } else {
            removeMemo({ memoId: memo?.id })
          }
        })
      }
    },
    [article?.id]
  )
  const { addEventListener, removeEventListener } = useHeaderEvent()

  useEffect(() => {
    addEventListener(onClick)
    if (article === undefined) {
      setEdit(true)
      setText('')
    }
    return () => {
      removeEventListener(onClick)
    }
  }, [addEventListener, onClick, removeEventListener])

  return (
    <MemoMainView>
      <ScrollView scrollEnabled={true}>
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
        <MemoCardsView>
          <MemoCardView>
            {edit ? (
              <MemoCardInput
                multiline
                defaultValue={text}
                onChangeText={txt => {
                  setText(txt)
                }}
              />
            ) : (
              <MemoContent>{text}</MemoContent>
            )}
          </MemoCardView>
          <UrlView>
            <UrlImg
              source={{
                uri: article
                  ? article.openGraph.linkImage
                  : 'https://via.placeholder.com/16x16'
              }}
            />
            <UrlFolder>{article?.folderTitle}</UrlFolder>
            <UrlTitleComponent>
              <UrlTitle>{article?.openGraph.linkTitle}</UrlTitle>
            </UrlTitleComponent>
            <UrlDate>{article?.registerDate.split('T')[0]}</UrlDate>
          </UrlView>
        </MemoCardsView>
      </ScrollView>
    </MemoMainView>
  )
}

export default MemoPage
