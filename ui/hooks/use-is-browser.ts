import { useState, useEffect } from 'react'

export const useIsBrowser = () => {
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => {
    setIsBrowser(true)
  }, [])
  return isBrowser
}
