import { getBuiltGraphSDK } from '.graphclient'
import { parseAmountToDisplay } from '@web3/helpers/handleAmount'
import { useQuery } from 'react-query'
import { Address } from 'wagmi'
import { getTracesGetOutbidPricesKey } from './keys'

const sdk = getBuiltGraphSDK()

const useTracesGetOutbidsByOwner = (address?: Address) => {
  const request = async () => {
    return sdk.GetOutbidsPrices({ currentOwner: address }).then(({ outbids }) => {
      return outbids.reduce((acc, curr) => acc + parseAmountToDisplay(curr.price), 0)
    })
  }

  return useQuery(getTracesGetOutbidPricesKey(address), request, { enabled: !!address })
}

export default useTracesGetOutbidsByOwner
