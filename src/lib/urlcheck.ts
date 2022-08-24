export function isValidUrl(url: string) {
  if (
    url.includes('\n') ||
    !url.match(
      /(https?)?(:\/\/)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
    )
  ) {
    return false
  }
  if (!url.includes('://')) {
    url = `https://${url}`
  }
  try {
    if (new URL(url)) {
      return url
    }
  } catch (e) {
    return false
  }
  return false
}
