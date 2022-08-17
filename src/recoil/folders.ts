import { atom, atomFamily, selector, selectorFamily } from 'recoil'

export interface IFolderBase {
  folderId: string
  folderTitle: string
  folderColor: string
}

export interface IFolder extends IFolderBase {
  articleCount: number
}

export interface IFolderDetail extends IFolderBase {
  articles: any[]
}

export const foldersAtom = atom<IFolder[]>({
  key: 'folders',
  default: []
})

export const folderIdsAtom = selector<string[]>({
  key: 'folderIds',
  get: ({ get }) => {
    const folders = get(foldersAtom) || []
    const folderIds = folders.map(({ folderId }) => folderId)
    return folderIds
  }
})

export const foldersFamily = selectorFamily<IFolder, string>({
  key: 'foldersFamily',
  get:
    folderId =>
    ({ get }) => {
      const folders = get(foldersAtom)
      const folder = folders.find(
        ({ folderId: _folderId }) => _folderId === folderId
      )
      if (folder) {
        return folder
      }
      return {
        folderId,
        folderTitle: '잘못된 폴더',
        folderColor: '0',
        articleCount: 0
      }
    }
})

export const foldersDetailFamily = atomFamily<IFolderDetail, string>({
  key: 'folderDetailFamily',
  default: folderId => ({
    folderId,
    folderTitle: '',
    folderColor: 'Navy',
    articles: []
  })
})
