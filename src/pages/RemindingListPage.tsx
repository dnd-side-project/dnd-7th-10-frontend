import React, { useEffect, useCallback, useState, useRef } from 'react'
import styled from '@emotion/native'
// import FolderCardList from '../components/FolderContent/FolderCardList'
import Header, { IIconButton } from '../components/Common/Header'
import RemindingCardList from '../components/RemindingList/RemindingCardList'
import useHeaderEvent from '../hooks/useHeaderEvent'
import { ColorPalette, Typo } from '../styles/variable'
import { backgroundWithColor } from '../styles/backgrounds'

const RemindDescView = styled.View`
  flex: 1;
  position: relative;
`

const AlertToastView = styled.View`
  height: 42px;
  position: absolute;
  z-index: 9999;
  right: 24px;
  padding: 0 24px;
  top: 52px;
  border-radius: 4px;
  ${backgroundWithColor('Function_Blue')}
`
const AlertToastText = styled.Text`
  ${Typo.Heading4_600};
  color: ${ColorPalette.White};
  line-height: 42px;
`

const AlertToastTriangle = styled.Image`
  width: 8px;
  height: 8px;
  position: absolute;
  top: -8px;
  right: 14px;
`

const RemindingListPage = () => {
  const handlerRef = useRef<number | null>(null)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const iconButtons: IIconButton[] = [
    {
      name: 'folder-content-alert',
      source: require('../assets/images/alert-circle-normal.png')
    }
  ]

  const onClick = useCallback((name: string) => {
    if (name === 'folder-content-alert') {
      if (handlerRef.current !== null) {
        clearTimeout(handlerRef.current)
      }
      setShowAlert(true)
      handlerRef.current = setTimeout(() => {
        setShowAlert(false)
        handlerRef.current = null
      }, 2000)
    }
  }, [])

  const { addEventListener, removeEventListener } = useHeaderEvent()

  useEffect(() => {
    addEventListener(onClick)
    return () => {
      removeEventListener(onClick)
    }
  }, [addEventListener, removeEventListener, onClick])

  return (
    <RemindDescView>
      <Header iconButtons={iconButtons}>리마인딩 리스트</Header>
      <RemindingCardList />
      {showAlert && (
        <AlertToastView>
          <AlertToastText>북마크한 링크들만 모았어요.</AlertToastText>
          <AlertToastTriangle
            source={require('../assets/images/triangle_blue.png')}
            resizeMode="stretch"
          />
        </AlertToastView>
      )}
    </RemindDescView>
  )
}

export default RemindingListPage
