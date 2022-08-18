import React from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { ColorPalette, Typo } from '../../styles/variable'
import { fontWithColor } from '../../styles/fonts'
import SVG from '../../assets/images/svg'
import { flexWithAlign } from '../../styles/flexbox'
import Empty from '../Common/Empty'

const SetupContentView = styled.View`
  ${backgroundWithColor('White')}
  flex: 1;
  padding: 24px 18px;
`

const SetupTitleView = styled.View`
  ${flexWithAlign('center', 'space-between', 'row')}
`

const SetupTitle = styled.Text`
  ${fontWithColor('BlueGray_3')}
  ${Typo.Heading3_600}
`

const SetupPlusTouchable = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`

const SetupEmptyWrapper = styled.View`
  min-height: 260px;
  margin-bottom: 60px;
`

const addButtonInsets = { top: 8, bottom: 8, left: 8, right: 8 }

const SetupContent = () => {
  return (
    <SetupContentView>
      <SetupTitleView>
        <SetupTitle>이 시간에 설정한{'\n'}링크가 아직 없어요!</SetupTitle>
        <SetupPlusTouchable hitSlop={addButtonInsets}>
          <SVG.AddLight stroke={ColorPalette.LinkkleBlueGray} width="24" />
        </SetupPlusTouchable>
      </SetupTitleView>
      <SetupEmptyWrapper>
        <Empty
          background="White"
          text={'링크가 설정되지 않았어요!\n리마인딩 받을 링크를 추가해보세요.'}
          button
          buttonText="링크 모으기"
        />
      </SetupEmptyWrapper>
    </SetupContentView>
  )
}

export default SetupContent
