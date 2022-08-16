import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import api from '../../lib/api'
import { folderIdsAtom, foldersAtom, IFolder } from '../../recoil/folders'

export default function useFolderList(): [string[], () => void] {
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const setFolders = useSetRecoilState(foldersAtom)
  const folderIds = useRecoilValue(folderIdsAtom)

  async function fetchFolders() {
    const response = await api.get<IFolder[]>('/folders')
    if (response.status === 200) {
      console.log('fetched')
      console.log(response.data)
      setFolders(response.data)
    } else {
      setFolders([])
    }
  }

  if (!isFetched) {
    fetchFolders()
    setIsFetched(true)
  }

  return [folderIds, fetchFolders]
}
