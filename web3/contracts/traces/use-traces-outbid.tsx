import { Address, useWaitForTransaction } from 'wagmi'
import { BigNumber } from 'ethers'
import { useMutation } from 'react-query'
import useTraces from './use-traces'
import { parseAmountToContract } from '@web3/helpers/handleAmount'
import useTxToast from '@ui/hooks/use-tx-toast'
import { useState } from 'react'

type Payload = {
  tokenAddress?: Address
  tokenId: BigNumber
  amount: number
}

const useTracesOutbid = () => {
  const { showTxErrorToast, showTxExecutedToast } = useTxToast()
  const traces = useTraces()
  const [hash, setHash] = useState<Address | undefined>()

  useWaitForTransaction({
    hash,
    onSettled: (_, error) => {
      if (error) {
        showTxErrorToast(error)
        return
      }

      showTxExecutedToast({
        title: 'Mint/Outbid confirmed.',
        txHash: hash,
        id: 'oubid-approved',
      })
    },
  })

  const request = async ({ amount, tokenAddress, tokenId }: Payload) => {
    return tokenAddress && traces?.outbid(tokenAddress, tokenId, parseAmountToContract(amount))
  }

  return useMutation(request, {
    onSuccess: (data) => {
      setHash(data?.hash as Address)
    },
    onError: (error: any) => {
      showTxErrorToast(error)
      setHash(undefined)
    },
  })
}

export default useTracesOutbid
