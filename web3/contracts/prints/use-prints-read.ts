// Dependencies
import { Address, useContractRead } from 'wagmi'

// Helpers
import PrintsContract from './prints-abi'
import useWallet from '@web3/wallet/use-wallet'

const usePrintsRead = () => {
  const { address } = useWallet()

  const { data: allowance, refetch: refetchAllowance } = useContractRead({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS as Address,
    abi: PrintsContract,
    functionName: 'allowance',
    enabled: !!address,
    args: [address as Address, process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address],
  })

  return {
    allowance,
    refetchAllowance,
  }
}

export default usePrintsRead
