import React from 'react'
import styled from '@emotion/native'
import { backgroundWithColor, shadow } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import { fontWithColor } from '../../styles/fonts'
import { ColorPalette, Typo } from '../../styles/variable'
import { TouchableOpacity } from 'react-native'

const MemoEditorView = styled.View`
  ${backgroundWithColor('White')}
  position:absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 24px;
`

const MemoEditorTop = styled.View`
  ${flexWithAlign('center', 'space-between', 'row')}
  min-height: 24px;
`

const MemoEditorTopButtons = styled.View`
  flex-direction: row;
`

const MemoEditorTitleText = styled.Text`
  ${fontWithColor('BlueGray_4')}
  ${Typo.Heading4_600}
`

const MemoEditorSaveText = styled.Text`
  ${fontWithColor('system_blue')}
  ${Typo.Heading4_600}
  margin-left: 16px;
`

const MemoEditorCancelText = styled.Text`
  ${fontWithColor('BlueGray_3')}
  ${Typo.Heading4_600}
  margin-left: auto;
`

const MemoEditorTextInput = styled.TextInput`
  ${backgroundWithColor('background_1')}
  border: 1px solid ${ColorPalette.BlueGray_2};
  ${fontWithColor('BlueGray_4')}
  ${Typo.Body2_600}
  border-radius: 4px;
  padding: 8px;
  max-height: 82px;
  margin-top: 8px;
`

interface Props {
  onCancelPress?: () => void
  onSavePress?: () => void
  memo?: string
  setMemo?: (memo: string) => void
}

const MemoEditor = ({ onCancelPress, onSavePress, memo, setMemo }: Props) => {
  const onCancelButtonPress = () => {
    if (setMemo) {
      setMemo('')
    }
    if (onCancelPress) {
      onCancelPress()
    }
  }

  return (
    <MemoEditorView style={shadow}>
      <MemoEditorTop>
        <MemoEditorTitleText>메모 작성하기</MemoEditorTitleText>
        <MemoEditorTopButtons>
          <TouchableOpacity onPress={onCancelButtonPress}>
            <MemoEditorCancelText>취소</MemoEditorCancelText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSavePress}>
            <MemoEditorSaveText>저장</MemoEditorSaveText>
          </TouchableOpacity>
        </MemoEditorTopButtons>
      </MemoEditorTop>
      <MemoEditorTextInput multiline value={memo} onChangeText={setMemo} />
    </MemoEditorView>
  )
}

export default MemoEditor
