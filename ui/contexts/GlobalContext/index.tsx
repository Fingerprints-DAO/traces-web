import React, {
  createContext,
  useRef,
  MutableRefObject,
  PropsWithChildren,
} from 'react'

type ContextType = {}

const DEFAULT_CONTEXT = {} as ContextType

const GlobalContext = createContext(DEFAULT_CONTEXT)

export const GlobalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <GlobalContext.Provider
      value={{
        ...DEFAULT_CONTEXT,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
