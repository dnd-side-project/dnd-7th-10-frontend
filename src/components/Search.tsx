import React from 'react'
import styled, { css } from '@emotion/native'
import SearchIcon from '../assets/image/search.svg'

const SearchBox = styled.View`
  border-radius: 4px;
  height: 40px;
  background: #f4f5f9;
  flex-direction: row;
`

const SearchTextInput = styled.TextInput`
  flex: 1;
`

const searchIconStyle = css`
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 8px;
  top: 8px;
`

const Search = () => {
  return (
    <SearchBox>
      <SearchTextInput />
      <SearchIcon style={searchIconStyle} />
    </SearchBox>
  )
}

export default Search
