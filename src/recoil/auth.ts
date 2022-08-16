import { atom } from 'recoil'

export interface IUser {
  username: string
}

export interface IAuthKey {
  accessToken: string
  refreshToken: string
}

export interface IAuth {
  user: IUser | null
  authKey: IAuthKey | null
}

export const authAtom = atom<IAuth>({
  key: 'user',
  default: {
    user: null,
    authKey: null
  }
})
