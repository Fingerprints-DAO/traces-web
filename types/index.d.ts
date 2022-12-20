declare global {
  interface Window {
    ethereum: any
  }
}

interface RevertError extends Error {
  errorName?: string
}
