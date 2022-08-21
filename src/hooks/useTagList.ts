import { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import api from '../lib/api'
import { ITag, tagsAtom } from '../recoil/tags'

export default function useTagList(): [boolean, ITag[], () => void] {
  const [isTagLoading, setIsTagLoading] = useState<boolean>(false)
  const [tags, setTags] = useRecoilState<ITag[]>(tagsAtom)

  const fetchTagList = useCallback(() => {
    if (isTagLoading) {
      return
    }

    setIsTagLoading(true)
    api
      .get<ITag[]>('/tag')
      .then(response => {
        if (response.status === 200) {
          setTags(response.data)
        }
      })
      .catch(error => console.error(error))
      .finally(() => {
        setIsTagLoading(false)
      })
  }, [isTagLoading, setTags])

  return [isTagLoading, tags, fetchTagList]
}
