import React, { PropsWithChildren } from 'react'
import styled from '@emotion/native'
import { StyleSheet } from 'react-native'

const BottomButtonView = styled.View<{ absolute?: boolean }>`
  width: 100%;
  height: 128px;
  background: white;
  padding: 24px;
  ${props => (props.absolute ? 'position: absolute; bottom: 0; left: 0;' : '')};
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

const BottomButton = ({
  children,
  absolute
}: PropsWithChildren<{ absolute?: boolean }>) => {
  return (
    <BottomButtonView style={styles.shadow} absolute={absolute}>
      {children}
    </BottomButtonView>
  )
}

export default BottomButton
