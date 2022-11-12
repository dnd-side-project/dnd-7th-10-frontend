export function isValidUrl(url: string) {
  if (
    url.includes('\n') ||
    url.trim() === '' ||
    !url.match(
      /(https?)?(:\/\/)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
    )
  ) {
    return false
  }
  if (!url.includes('://')) {
    return `https://${url}`
  }
  return url
}

export function appendHttps(url: string) {
  if (url.startsWith('//')) {
    return `https:${url}`
  }
  return url
}
