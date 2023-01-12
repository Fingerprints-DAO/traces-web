import { getBuiltGraphSDK } from '.graphclient'
import { useQuery } from 'react-query'
import { Address } from 'wagmi'
import { getTracesWNFTSKey } from './keys'

const sdk = getBuiltGraphSDK()

const useTracesGetWNFTs = (address?: Address) => {
  const request = async () => sdk.GetWNFTS({ currentOwner: address }).then(({ wnfts }) => wnfts)

  return useQuery(getTracesWNFTSKey(address), request, { enabled: !!address })
}

export default useTracesGetWNFTs
