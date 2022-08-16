import React, { useCallback } from 'react'
import styled from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../../pages/Router'

const FolderAddTouchable = styled.TouchableOpacity`
  width: 146px;
  height: 120px;
  margin-right: 10px;
`

const FolderAddImage = styled.Image`
  width: 146px;
  height: 120px;
`

const FolderAdd = () => {
  const navigation = useNavigation<RouterNavigationProps>()

  const onPress = useCallback(() => {
    navigation.navigate('FolderAdd')
  }, [navigation])

  return (
    <FolderAddTouchable onPress={onPress}>
      <FolderAddImage
        source={require('../../assets/images/folder_add_light.png')}
      />
    </FolderAddTouchable>
  )
}

export default FolderAdd
