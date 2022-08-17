import { ITag, tagsAtom } from '../recoil/tags'
import useRecoilApi from './useRecoilApi'

export default function useTagList() {
  const { isLoading, isError, recoilValue, refresh } = useRecoilApi<ITag[]>(
    '/tag',
    tagsAtom,
    {
      queryOnInitial: true
    }
  )

  return {
    isTagError: isError,
    isTagLoading: isLoading,
    tags: recoilValue,
    refreshTag: refresh
  }
}
