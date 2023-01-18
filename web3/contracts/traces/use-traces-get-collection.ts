import { getBuiltGraphSDK } from '.graphclient'
import { useQuery } from 'react-query'
import { getTracesCollectionKey } from './keys'

const sdk = getBuiltGraphSDK()
const refreshIntervalTime = 1000 * 60 * 5

const useTracesGetCollection = (id: string) => {
  const fetcher = async () => sdk.GetCollection({ ogTokenAddress: id })

  return useQuery(getTracesCollectionKey(id), fetcher, {
    enabled: !!id,
    refetchOnWindowFocus: true,
    refetchInterval: refreshIntervalTime,
  })
}

export default useTracesGetCollection
