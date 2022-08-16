import React from 'react'
import styled from '@emotion/native'

const SearchBarView = styled.View`
  border-radius: 4px;
  height: 48px;
  background: #f4f5f9;
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
`

const SearchBarTextInput = styled.TextInput`
  background: transparent;
  flex: 1;
  padding: 0;
  color: #0c1118;
`

const SearchIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-left: 8px;
`

const SearchBar = () => {
  return (
    <SearchBarView>
      <SearchBarTextInput />
      <SearchIcon source={require('../../assets/images/icon_search.png')} />
    </SearchBarView>
  )
}

export default SearchBar
