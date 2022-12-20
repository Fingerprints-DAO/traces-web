// Dependencies
import { useContract, useSigner } from 'wagmi'

// Helpers
import TracesContract from './traces-abi'

const useTraces = () => {
  const { data } = useSigner()

  const traces = useContract({
    abi: TracesContract,
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS || '',
    signerOrProvider: data,
  })

  if (!traces) {
    return
  }

  return traces
}

export default useTraces
