// Dependencies
import { TracesContext } from '@ui/contexts/Traces'
import { useContext } from 'react'
import { useContract, useSigner } from 'wagmi'

// Helpers
import PrintsContract from './prints-abi'

const usePrints = () => {
  const { data } = useSigner()
  const { printContractAddress } = useContext(TracesContext)

  const prints = useContract({
    abi: PrintsContract,
    address: printContractAddress,
    signerOrProvider: data,
  })

  if (!prints) {
    return undefined
  }

  return prints
}

export default usePrints
