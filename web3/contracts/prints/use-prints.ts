// Dependencies
import { Address, useContract, useSigner } from 'wagmi'

// Helpers
import PrintsContract from './prints-abi'

const usePrints = () => {
  const { data } = useSigner()

  const prints = useContract({
    abi: PrintsContract,
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS as Address,
    signerOrProvider: data,
  })

  if (!prints) {
    return undefined
  }

  return prints
}

export default usePrints
