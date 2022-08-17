import { folderArticleFamily, IArticle } from '../recoil/folders'
import useRecoilApi from './useRecoilApi'

export default function useArticleDetail(articleId: string) {
  const { isLoading, isError, recoilValue, refresh } = useRecoilApi<IArticle>(
    `/article/${articleId}`,
    folderArticleFamily(articleId)
  )

  return {
    isLoading,
    isError,
    recoilValue,
    refresh
  }
}
