import { foldersDetailFamily, IFolderDetail } from '../recoil/folders'
import useRecoilApi from './useRecoilApi'

export default function useFolderDetail(
  folderId: string,
  queryOnInitial: boolean = false
) {
  const { isLoading, isError, recoilValue, refresh } =
    useRecoilApi<IFolderDetail>(
      `/folder/${folderId}`,
      foldersDetailFamily(folderId),
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
