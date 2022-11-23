import Error, { ErrorProps } from 'next/error'
import { PropsWithChildren } from 'react'

interface ErrorHandlingLayoutProps {
  error: ErrorProps
}

const ErrorHandlingLayout: React.FC<PropsWithChildren<ErrorHandlingLayoutProps>> = ({ error, children }) => {
  if (error) {
    return <Error statusCode={error.statusCode} />
  }

  return <>{children}</>
}

export default ErrorHandlingLayout
