import { useState } from 'react'

// Dependencies
import { Address, useWaitForTransaction } from 'wagmi'
import { BigNumber } from 'ethers'
import { useMutation } from 'react-query'
import useTxToast from '@ui/hooks/use-tx-toast'

// Helpers
import usePrints from './use-prints'

const usePrintsApprove = () => {
  const { showTxErrorToast, showTxExecutedToast } = useTxToast()
  const prints = usePrints()
  const [isApproved, setIsApproved] = useState(false)
  const [hash, setHash] = useState<Address | undefined>()

  useWaitForTransaction({
    hash,
    onSettled: (_, error) => {
      if (error) {
        showTxErrorToast(error)
        return
      }
      setIsApproved(true)

      showTxExecutedToast({
        title: 'Prints approval confirmed.',
        txHash: hash,
        id: 'prints-approved',
      })
    },
  })

  const request = async ({ amount, isIncrease }: { amount: BigNumber; isIncrease?: boolean }) => {
    return prints?.[isIncrease ? 'increaseAllowance' : 'approve'](process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address, amount)
  }

  const approveRequest = useMutation(request, {
    onSuccess: (data) => {
      setHash(data?.hash as Address)
    },
    onError: (error: any) => {
      showTxErrorToast(error)
      setHash(undefined)
      setIsApproved(false)
    },
  })

  return { approveRequest, isApproved, hash }
}

export default usePrintsApprove
