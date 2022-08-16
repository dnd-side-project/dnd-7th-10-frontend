import React, { PropsWithChildren } from 'react'
import styled from '@emotion/native'
import { StyleSheet } from 'react-native'

const BottomButtonView = styled.View`
  width: 100%;
  height: 128px;
  background: white;
  padding: 24px;
`

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 5,
    zIndex: 999
  }
})

const BottomButton = ({ children }: PropsWithChildren) => {
  return <BottomButtonView style={styles.shadow}>{children}</BottomButtonView>
}

export default BottomButton
