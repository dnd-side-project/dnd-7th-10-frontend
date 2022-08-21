import { atom, selector } from 'recoil'

export interface ITag {
  tagId: string
  tagName: string
}

export const tagsAtom = atom<ITag[]>({
  key: 'tags',
  default: []
})

export const tagIdsAtom = selector<string[]>({
  key: 'tagIds',
  get: ({ get }) => {
    const tags = get(tagsAtom) || []
    const tagIds = tags.map(({ tagId }) => tagId)
    return tagIds
  }
})
