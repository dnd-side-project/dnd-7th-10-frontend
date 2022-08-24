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

const MemoMainView = styled.View`
  background-color: '#f5f5f5';
`

const MemoCardsView = styled.View`
  display: flex;
  align-items: flex-start;
  padding-top: 24px;
  width: 414px;
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

  border: 1px solid ${ColorPalette.BlueGray_2}
  border-radius: 38px;
`
const UrlFolder = styled.Text`
  position: absolute;
  left: 25.6%;
  top: 16.33%;
  bottom: 65.31%;

  font-family: ${Typo.Detail2_400}
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
  font-family: ${Typo.Heading3_600}
  font-size: 18px;
  line-height: 27px;

  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4}
`
const UrlDate = styled.Text`
  position: absolute;
  left: 25.6%;
  top: 70.41%;
  bottom: 11.22%;

  font-family: ${Typo.Detail2_400}
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_3}
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
  memoId?: string
  memoContent?: string
}

const MemoPage = ({
  route
}: NativeStackScreenProps<RouterParamList, 'MemoPage'>) => {
  const { memo } = route.params
  const { id, content, folderTitle, openGraph, registerDate } = memo
  console.log(content)
  const { linkTitle, linkImage } = openGraph
  const date = registerDate.split('T')[0]

  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(content)

  const patchData = { memoId: id, memoContent: text }

  const patchMemo = ({ memoId, memoContent }: Props) => {
    api
      .patch<IMemo>(`/memo/${memoId}`, memoContent)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
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
        removeMemo({ memoId: id })
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

  return (
    <MemoMainView>
      <ScrollView scrollEnabled={true}>
        <Header
          iconButtons={edit ? undefined : iconButtons}
          save={edit ? true : false}
          onSavePress={() => {
            patchMemo(patchData)
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
                uri: linkImage ? linkImage : 'https://via.placeholder.com/16x16'
              }}
            />
            <UrlFolder>{folderTitle}</UrlFolder>
            <UrlTitleComponent>
              <UrlTitle>{linkTitle}</UrlTitle>
            </UrlTitleComponent>
            <UrlDate>{date}</UrlDate>
          </UrlView>
        </MemoCardsView>
      </ScrollView>
    </MemoMainView>
  )
}

export default MemoPage
