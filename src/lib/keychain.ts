import { getGenericPassword, setGenericPassword } from 'react-native-keychain'

const keychain = (() => {
  async function getCredentials() {
    try {
      const credentials = await getGenericPassword()
      if (credentials) {
        return credentials
      }
    } catch (e) {
      console.error(e)
    }
    return null
  }

  async function getAccessToken() {
    const credentials = await getCredentials()
    if (credentials) {
      return credentials.username
    }
    return null
  }

  async function getRefreshToken() {
    const credentials = await getCredentials()
    if (credentials) {
      return credentials.password
    }
    return null
  }

  async function setToken(accessToken: string, refreshToken: string) {
    try {
      setGenericPassword(accessToken, refreshToken)
    } catch (e) {
      console.error(e)
    }
    return null
  }

  return {
    getAccessToken,
    getRefreshToken,
    setToken
  }
})()

export default keychain
