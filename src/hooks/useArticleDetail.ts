import { folderArticleFamily, IArticle } from '../recoil/folders'
import useRecoilApi from './useRecoilApi'

export default function useArticleDetail(
  articleId: string,
  queryOnInitial: boolean = false
) {
  const { isLoading, isError, recoilValue, refresh } = useRecoilApi<IArticle>(
    `/article/${articleId}`,
    folderArticleFamily(articleId),
    {
      queryOnInitial
    }
  )

  return {
    isLoading,
    isError,
    recoilValue,
    refresh
  }
}
