// Dependencies
import { useToast } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

// Helpers
import PrintsContract from './contract'

const usePrintsApprove = (amount?: BigNumber) => {
  const toast = useToast()
  const { address } = useAccount()

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS,
    abi: PrintsContract,
    functionName: 'approve',
    enabled: Boolean(address) && Boolean(amount),
    args: [address!, amount!],
  })

  return useContractWrite({
    ...config,
    onSettled: (_, error) => {
      if (!error) {
        console.log('AQUI STTLED')
      }
    },
    onError: () => {
      toast({ title: 'Error', description: 'User reject transaction', status: 'error' })
    },
  })
}

export default usePrintsApprove
