import { Admin, Editor, getBuiltGraphSDK } from '.graphclient'
import { useQuery } from 'react-query'
import { getTracesAdministratorsKey } from './keys'

const sdk = getBuiltGraphSDK()

const useTracesGetAdministrators = (isAdmin?: boolean) => {
  const request = async () => sdk.GetAdministrators().then(({ admins, editors }) => [...(admins || []), ...(editors || [])])

  return useQuery(getTracesAdministratorsKey, request, { enabled: isAdmin })
}

export default useTracesGetAdministrators
