import { getBuiltGraphSDK } from '.graphclient'
import { useQuery } from 'react-query'
import { getTracesAdministratorsKey } from './keys'

const sdk = getBuiltGraphSDK()

const useTracesGetAdministrators = (isAdmin?: boolean) => {
  const request = async () => sdk.GetAdministrators()

  return useQuery(getTracesAdministratorsKey, request, { enabled: isAdmin })
}

export default useTracesGetAdministrators
