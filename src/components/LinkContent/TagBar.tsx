import React from 'react'
import styled from '@emotion/native'
import TagList from '../Common/TagList'
import { ITag } from '../../recoil/tags'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import { fontWithColor } from '../../styles/fonts'
import { Typo } from '../../styles/variable'

const TagsView = styled.View`
  ${backgroundWithColor('White')}
  ${flexWithAlign('center', 'flex-start', 'row')}
  height: 64px;
  padding: 0 24px;
  margin: 4px 0px;
`

// const TagAddImage = styled.Image`
//   width: 24px;
//   height: 24px;
// `

// const TagAddButton = styled.TouchableOpacity`
//   margin-left: 12px;
// `

const TagListScroll = styled.ScrollView`
  flex: 1;
`

const TagListView = styled.View`
  flex: 1;
`

const TagEmptyView = styled.View`
  ${backgroundWithColor('background_1')}
  border-radius: 3px;
  padding: 0 16px;
  height: 34px;
  justify-content: center;
`

const TagEmptyText = styled.Text`
  ${fontWithColor('BlueGray_4')}
  ${Typo.Detail2_400}
`

interface Props {
  tags: ITag[]
}

const TagBar = ({ tags }: Props) => {
  return (
    <TagsView>
      <TagListScroll horizontal nestedScrollEnabled>
        {tags && tags.length > 0 ? (
          <TagListView>
            <TagList noMargin tags={tags} />
          </TagListView>
        ) : (
          <TagEmptyView>
            <TagEmptyText>설정된 태그가 없어요!</TagEmptyText>
          </TagEmptyView>
        )}
      </TagListScroll>
      {/* <TagAddButton>
        <TagAddImage source={require('../../assets/images/plus.png')} />
      </TagAddButton> */}
    </TagsView>
  )
}

export default TagBar
