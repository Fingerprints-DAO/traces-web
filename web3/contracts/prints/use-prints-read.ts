// Dependencies
import { Address, useContractRead } from 'wagmi'

// Helpers
import PrintsContract from './prints-abi'
import useWallet from '@web3/wallet/use-wallet'
import { useContext } from 'react'
import { TracesContext } from '@ui/contexts/Traces'

const usePrintsRead = () => {
  const { address } = useWallet()
  const { printContractAddress } = useContext(TracesContext)

  const { data: allowance, refetch: refetchAllowance } = useContractRead({
    address: printContractAddress,
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
