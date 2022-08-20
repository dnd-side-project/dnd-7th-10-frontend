import React from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import GatherArticleItem from './GatherArticleItem'
import Empty from '../Common/Empty'

const GatherArticleListView = styled.ScrollView`
  ${backgroundWithColor('background_1')}
`

const GatherArticleView = styled.View`
  ${flexWithAlign('flex-start', 'space-between', 'row')}
  flex-wrap: wrap;
  padding: 16px;
`

const containerStyle = { flexGrow: 1 }

const GatherArticleList = () => {
  return (
    <>
      {true ? (
        <Empty
          icon
          source={require('../../assets/images/alert-circle-normal.png')}
          button
          text={'북마크한 링크들이 없어요!\n리마인딩할 링크들을 모아볼까요?'}
        />
      ) : (
        <GatherArticleListView contentContainerStyle={containerStyle}>
          <GatherArticleView>
            <GatherArticleItem
              articleName="Developer Apple"
              folderName="디자인 레퍼런스"
              tags={['zz']}
            />
            <GatherArticleItem
              articleName="Developer Apple"
              folderName="디자인 레퍼런스"
              tags={['zz']}
            />
            <GatherArticleItem
              articleName="Developer Apple"
              folderName="디자인 레퍼런스"
              tags={['zz']}
            />
            <GatherArticleItem
              articleName="Developer Apple"
              folderName="디자인 레퍼런스"
              tags={['zz']}
            />
          </GatherArticleView>
        </GatherArticleListView>
      )}
    </>
  )
}

export default GatherArticleList
