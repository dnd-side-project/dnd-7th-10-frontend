import { atom, selector, selectorFamily } from 'recoil'

export interface IFolder {
  folderId: string
  folderTitle: string
  folderColor: string
  articleCount: number
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
