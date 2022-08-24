import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import { ITag } from './tags'

export interface IFolderBase {
  folderId: string
  folderTitle: string
  folderColor: string
}

export interface IFolder extends IFolderBase {
  articleCount: number
}

export interface IOpenGraph {
  linkTitle: string
  linkDescription: string
  linkImage: string
}

export interface IMemo {
  registerDate: string
  modifiedDate: string
  id: string
  content: string
  folderTitle?: string
  openGraph?: IOpenGraph
}

export interface IArticle {
  id: string
  remindId: string | null
  linkUrl: string
  openGraph: IOpenGraph
  memos: IMemo[]
  registerDate: string
  modifiedDate: string
  bookmark: boolean
  tags: ITag[]
}

export interface IFolderDetail extends IFolderBase {
  articles: IArticle[]
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
      const folders = get(foldersAtom) || []
      const folder = folders.find(
        ({ folderId: _folderId }) => _folderId === folderId
      )
      if (folder) {
        return folder
      }
      return {
        folderId,
        folderTitle: '폴더를 찾을 수 없습니다.',
        folderColor: '0',
        articleCount: 0
      }
    }
})

// export const folderArticleFamily = selectorFamily<IArticle | null, string>({
//   key: 'folderArticleFamily',
//   get:
//     articleId =>
//     ({ get }) => {
//       const folder = get(foldersDetailFamily(articleId))
//       if (folder && folder.articles.length > 0) {
//         console.log('folder got', folder)
//         const article = folder.articles.find(({ id }) => id === articleId)
//         console.log(article)
//         if (article) {
//           return article
//         }
//       }
//       return null
//     }
// })

export const folderArticleFamily = atomFamily<IArticle, string>({
  key: 'folderArticleFamily',
  default: articleId => ({
    id: articleId,
    remindId: null,
    linkUrl: '',
    openGraph: {
      linkDescription: '',
      linkImage: '',
      linkTitle: ''
    },
    memos: [],
    registerDate: '',
    modifiedDate: '',
    bookmark: false,
    tags: []
  })
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

export const articlesFamily = atomFamily<IArticle | null, string>({
  key: 'articlesFamily',
  default: () => null
})
