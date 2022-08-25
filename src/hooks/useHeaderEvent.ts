import { IHeaderMenuHandler } from '../recoil/global'

const handlers: IHeaderMenuHandler[] = []
const addEventListener = (handler: IHeaderMenuHandler) => {
  if (!handlers.includes(handler)) {
    handlers.push(handler)
  }
}

const removeEventListener = (handler: IHeaderMenuHandler) => {
  const index = handlers.indexOf(handler)
  if (index > -1) {
    handlers.splice(index, 1)
  }
}

export default function useHeaderEvent() {
  return {
    handlers,
    addEventListener,
    removeEventListener
  }
}

// const onIconPress = useCallback(
//   (name: string) => {
//     handlers.forEach(handler => handler(name))
//   },
//   [handlers]
// )
