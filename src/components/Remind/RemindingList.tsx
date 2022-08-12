import React from 'react'
import styled from '@emotion/native'
import LinkCard from '../Remind/LinkCard'
import { ILink } from './LinkCard'

const RemindingListView = styled.View``
const TopView = styled.View``

interface LinkList extends Array<ILink> {}
interface Props {
  list: LinkList
}

const RemindingList = ({ list }: Props) => {
  return (
    <RemindingListView>
      <TopView />
      {list.map((link, idx) => (
        <LinkCard link={link} key={idx} />
      ))}
    </RemindingListView>
  )
}

export default RemindingList
