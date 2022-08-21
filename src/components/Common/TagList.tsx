import React from 'react'
import styled from '@emotion/native'
import Tag from './Tag'
import { ITag } from '../../recoil/tags'
import { TouchableOpacity } from 'react-native'

const TagListView = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  margin-right: -10px;
`

interface Props {
  tags: ITag[]
  remove?: boolean
  selectedIds?: string[]
  onTagPress?: (tagId: string, selected: boolean) => void
  onRemovePress?: (tagId: string) => void
}

const TagList = ({
  tags,
  remove,
  selectedIds,
  onTagPress,
  onRemovePress
}: Props) => {
  function onTagPressCallback(tagId: string, selected: boolean) {
    if (onTagPress) {
      onTagPress(tagId, selected)
    }
  }

  function onTagRemovePress(tagId: string) {
    if (onRemovePress) {
      onRemovePress(tagId)
    }
  }

  return (
    <TagListView>
      {tags.map(tag => {
        const selected = (selectedIds || []).includes(tag.tagId)
        return (
          <TouchableOpacity
            key={tag.tagId}
            onPress={() => onTagPressCallback(tag.tagId, selected)}
          >
            <Tag
              remove={remove}
              text={tag.tagName}
              selected={selected}
              onRemovePress={() => onTagRemovePress(tag.tagId)}
            />
          </TouchableOpacity>
        )
      })}
    </TagListView>
  )
}

export default TagList
