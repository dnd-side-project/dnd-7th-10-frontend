import React, { useCallback } from 'react'
import styled from '@emotion/native'
import { backgroundWithColor, shadowShallow } from '../../styles/backgrounds'
import { ColorPalette, Typo } from '../../styles/variable'
import { flexWithAlign } from '../../styles/flexbox'
import { fontWithColor } from '../../styles/fonts'
import { TouchableOpacity } from 'react-native'
import SVG from '../../assets/images/svg'
import { useRecoilState } from 'recoil'
import { quicklinkAtom } from '../../recoil/global'
import api from '../../lib/api'
import { IArticle } from '../../recoil/folders'
import useToast, {
  createCheckToast,
  createWarnToast,
  ToastOffset
} from '../../hooks/useToast'
import useFolderList from './FolderList.hook'

const QuickLinkView = styled.View`
  ${backgroundWithColor('White')}
  position:absolute;
  bottom: 48px;
  left: 24px;
  right: 24px;
  height: 140px;
  border-radius: 8px;
  border: 1px solid ${ColorPalette.BlueGray_2};
  padding: 16px;
`

const QuickLinkTop = styled.View`
  ${flexWithAlign('center', 'space-between', 'row')}
`

const QuickLinkTopButtons = styled.View`
  flex-direction: row;
`

const QuickLinkTitleText = styled.Text`
  ${fontWithColor('BlueGray_4')}
  ${Typo.Heading4_600}
`

const QuickLinkSaveText = styled.Text`
  ${fontWithColor('system_blue')}
  ${Typo.Heading4_600}
  margin-left: 16px;
`

const QuickLinkCancelText = styled.Text`
  ${fontWithColor('BlueGray_3')}
  ${Typo.Heading4_600}
  margin-left: auto;
`

const QuickLinkUrlScroll = styled.ScrollView`
  ${backgroundWithColor('background_1')}
  border-radius: 4px;
  height: 34px;
  max-height: 34px;
  margin: 16px 0 0;
  padding: 0 16px;
`

const QuickLinkUrlView = styled.View`
  flex: 1;
`

const QuickLinkUrlText = styled.Text`
  ${fontWithColor('BlueGray_4')}
  ${Typo.Detail2_400}
  width: 100%;
  height: 100%;
  line-height: 34px;
`

const QuickLinkBottom = styled.View`
  ${flexWithAlign('center', 'flex-start', 'row')}
  margin-top: auto;
  height: 18px;
`

const QuickLinkBottomText = styled.Text`
  ${fontWithColor('BlueGray_4')}
  ${Typo.Detail2_400}
  line-height: 18px;
  margin: 0 2px 0 4px;
`

const QuickLink = () => {
  const [quickLink, setQuickLink] = useRecoilState(quicklinkAtom)
  const showToast = useToast()
  const [, fetchFolders] = useFolderList()

  const onCancelPress = useCallback(() => {
    setQuickLink({
      folderId: undefined,
      linkUrl: undefined
    })
  }, [setQuickLink])

  const onSavePress = useCallback(() => {
    const payload = {
      ...quickLink,
      tagIds: []
    }
    setQuickLink({
      folderId: undefined,
      linkUrl: undefined
    })
    api
      .post<IArticle>('/article', payload)
      .then(response => {
        if (response.status === 200) {
          showToast(
            createCheckToast(
              '기본 폴더에 저장을 완료하였습니다.',
              ToastOffset.BottomTab
            )
          )
          fetchFolders()
        } else {
          showToast(
            createWarnToast('저장에 실패하였습니다.', ToastOffset.BottomTab)
          )
        }
      })
      .catch(e => {
        console.error(e)
        showToast(
          createWarnToast('저장에 실패하였습니다.', ToastOffset.BottomTab)
        )
      })
  }, [quickLink, showToast, setQuickLink, fetchFolders])

  return (
    <QuickLinkView style={shadowShallow}>
      <QuickLinkTop>
        <QuickLinkTitleText>복사한 링크 저장하기</QuickLinkTitleText>

        <QuickLinkTopButtons>
          <TouchableOpacity onPress={onCancelPress}>
            <QuickLinkCancelText>취소</QuickLinkCancelText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSavePress}>
            <QuickLinkSaveText>저장</QuickLinkSaveText>
          </TouchableOpacity>
        </QuickLinkTopButtons>
      </QuickLinkTop>
      <QuickLinkUrlScroll horizontal>
        <QuickLinkUrlView>
          <QuickLinkUrlText numberOfLines={1}>
            {quickLink.linkUrl?.split('\n').join('')}
          </QuickLinkUrlText>
        </QuickLinkUrlView>
      </QuickLinkUrlScroll>
      <QuickLinkBottom>
        <SVG.FolderStroke
          width={16}
          height={16}
          stroke={ColorPalette.BlueGray_4}
        />
        <QuickLinkBottomText>기본 폴더</QuickLinkBottomText>
        <SVG.ChevronRight
          width={16}
          height={16}
          stroke={ColorPalette.BlueGray_4}
        />
      </QuickLinkBottom>
    </QuickLinkView>
  )
}

export default QuickLink
