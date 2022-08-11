import React from 'react'
import styled from '@emotion/native'

const FolderAddImage = styled.Image`
  width: 146px;
  height: 120px;
  margin-right: 10px;
`

const FolderAdd = () => {
  return (
    <FolderAddImage source={require('../assets/images/folder_add_light.png')} />
  )
}

export default FolderAdd
