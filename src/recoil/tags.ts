import { atom } from 'recoil'

export interface ITag {
  tagId: string
  tagName: string
}

export const tagsAtom = atom<ITag[]>({
  key: 'tags',
  default: []
})
