// Dependencies
import { BigNumber } from 'ethers'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

// Helpers
import PrintsContract from './contract'

const usePrintsApprove = (amount?: BigNumber) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS,
    abi: PrintsContract,
    functionName: 'approve',
    enabled: !!amount,
    args: [process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as `0x${string}`, amount!],
  })

  return useContractWrite(config)
}

export default usePrintsApprove
