import React, { useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import ButtonGroup from './ButtonGroup'
import Button from './Button'
import { fontWithColor } from '../../styles/fonts'
import { flexWithAlign } from '../../styles/flexbox'
import { Typo } from '../../styles/variable'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { IModalState, modalStateAtom } from '../../recoil/global'
import { Animated } from 'react-native'

const ModalBackgroundView = styled(Animated.View)`
  background: rgba(21, 29, 41, 0.7);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const ModalContainerView = styled.View`
  ${backgroundWithColor('White')}
  ${flexWithAlign('center', 'center')}
  border-radius: 7px;
  margin: auto 40px;
  padding: 16px;
`

const ModalAlertImage = styled.Image`
  width: 64px;
  height: 64px;
  margin: 24px 0 4px;
`

const ModalTitleText = styled.Text`
  ${fontWithColor('BlueGray_5')}
  ${Typo.Heading2_600}
  margin-bottom: 4px;
`

const ModalDescriptionText = styled.Text`
  ${fontWithColor('BlueGray_4')}
  ${Typo.Body2_600}
  min-height: 38px;
  margin-bottom: 40px;
  text-align: center;
`

const Modal = () => {
  const {
    isModalOpen,
    title,
    description,
    cancel,
    ok,
    onOkPress,
    onCancelPress
  } = useRecoilValue<IModalState>(modalStateAtom)

  const opacity = useRef(new Animated.Value(0)).current
  const resetModal = useResetRecoilState(modalStateAtom)

  const fadeIn = useCallback(() => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start()
  }, [opacity])

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    if (isModalOpen) {
      fadeIn()
    }
  }, [isModalOpen, fadeIn])

  function onPressWithCallback(callback?: () => void) {
    return () => {
      setTimeout(() => {
        resetModal()
        if (callback) {
          callback()
        }
      }, 190)
      fadeOut()
    }
  }

  return (
    <>
      {isModalOpen && (
        <ModalBackgroundView style={{ opacity }}>
          <ModalContainerView>
            <ModalAlertImage
              source={require('../../assets/images/alert-circle.png')}
              resizeMode="contain"
            />
            <ModalTitleText>{title}</ModalTitleText>
            <ModalDescriptionText numberOfLines={3}>
              {description}
            </ModalDescriptionText>
            <ButtonGroup>
              <Button
                flex={1}
                group
                secondary
                onPress={onPressWithCallback(onCancelPress)}
              >
                {cancel || '취소할래요'}
              </Button>
              <Button flex={1} group onPress={onPressWithCallback(onOkPress)}>
                {ok || '네, 나갈래요'}
              </Button>
            </ButtonGroup>
          </ModalContainerView>
        </ModalBackgroundView>
      )}
    </>
  )
}

export default Modal
