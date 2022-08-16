import React, { useState } from 'react'
import styled from '@emotion/native'
import { flexWithAlign } from '../../styles/flexbox'
import FolderColorItem from './FolderColorItem'
import { ImageSourcePropType, TouchableOpacity } from 'react-native'

const FolderColorListView = styled.View`
  ${flexWithAlign('flex-start', 'space-between', 'row')}
  flex-wrap: wrap;
`

export interface IFolderColor {
  name: string
  source?: ImageSourcePropType
  fake?: boolean
}

interface Props {
  onColorChange?: (color: string) => void
}

export const folderColors: IFolderColor[] = [
  {
    name: 'Navy',
    source: require('../../assets/images/folder_navy.png')
  },
  {
    name: 'Sky',
    source: require('../../assets/images/folder_sky.png')
  },
  {
    name: 'Pink',
    source: require('../../assets/images/folder_pink.png')
  },
  {
    name: 'Yellow',
    source: require('../../assets/images/folder_yellow.png')
  },
  {
    name: 'Orange',
    source: require('../../assets/images/folder_orange.png')
  },
  {
    name: 'fake',
    fake: true
  }
]

const FolderColorList = ({ onColorChange }: Props) => {
  const [selected, setSelected] = useState<number>(-1)

  const onPress = (index: number) => {
    if (index < folderColors.length - 1) {
      const color = folderColors[index].name
      if (onColorChange) {
        onColorChange(color)
      }
      setSelected(index)
    }
  }

  return (
    <FolderColorListView>
      {folderColors.map((folderColor, index) => (
        <TouchableOpacity onPress={() => onPress(index)}>
          <FolderColorItem
            key={folderColor.name}
            selected={index === selected}
            folderColor={folderColor}
          />
        </TouchableOpacity>
      ))}
    </FolderColorListView>
  )
}

export default FolderColorList
