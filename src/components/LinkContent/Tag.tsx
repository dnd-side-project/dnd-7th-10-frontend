import React, { useState } from 'react'
import styled from '@emotion/native'
import { ColorPalette, FontFamily } from '../../styles/variable'

const TagComponent = styled.View`
  width: 100px;
  height: 35px;
  padding: 8px 16px;
  border-radius: 30px;
  background-color: ${ColorPalette.gray_5};
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 8px;
`

const TagText = styled.Text`
  font-family: ${FontFamily.Regular};
  color: ${ColorPalette.gray_1};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: flex-end;
`

const TagButton = styled.TouchableOpacity``

const TagImage = styled.Image`
  width: 24px;
  height: 24px;
`

interface Props {
  tag: string
}

const Tag = ({ tag }: Props) => {
  const [display, setDisplay] = useState(true)

  return (
    <>
      {display ? (
        <TagComponent>
          <TagText>{tag}</TagText>
          <TagButton onPress={() => setDisplay(false)}>
            <TagImage source={require('../../assets/images/icon_x.png')} />
          </TagButton>
        </TagComponent>
      ) : null}
    </>
  )
}

export default Tag
