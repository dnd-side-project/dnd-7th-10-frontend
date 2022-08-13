import React from 'react'
import styled from '@emotion/native'
import Tag from './Tag'

const TagListView = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  margin-right: -10px;
`

const TagList = () => {
  return (
    <TagListView>
      {new Array(50).fill(0).map((e, i) => (
        <Tag remove key={`${i}+23`} text={`tag.${i}`} />
      ))}
    </TagListView>
  )
}

export default TagList
