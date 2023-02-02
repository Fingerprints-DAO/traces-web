import { useEffect, useState } from 'react'

const isAPISupported = (api: string): boolean => (typeof window !== 'undefined' ? api in window : false)

const isClient = !!(typeof window !== 'undefined' && window.document && window.document.createElement)

const useMediaQuery = (mediaQuery: string) => {
  const [isVerified, setIsVerified] = useState<boolean>(isClient ? !!window?.matchMedia(mediaQuery).matches : false)

  useEffect(() => {
    const mediaQueryList = window?.matchMedia(mediaQuery)
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches)

    try {
      mediaQueryList.addEventListener('change', documentChangeHandler)
    } catch (e) {
      mediaQueryList.addListener(documentChangeHandler)
    }

    documentChangeHandler()
    return () => {
      try {
        mediaQueryList.removeEventListener('change', documentChangeHandler)
      } catch (e) {
        mediaQueryList.removeListener(documentChangeHandler)
      }
    }
  }, [mediaQuery])

  if (!isClient || !isAPISupported('matchMedia')) {
    return false
  }

  return isVerified
}

export default useMediaQuery
