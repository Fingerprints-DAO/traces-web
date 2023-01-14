import { TracesContext } from '@ui/contexts/Traces'
import { useContext } from 'react'
import { useContract, useSigner } from 'wagmi'
import TracesContract from './traces-abi'

const useTraces = () => {
  const { data } = useSigner()
  const { tracesContractAddress } = useContext(TracesContext)

  const traces = useContract({
    abi: TracesContract,
    address: tracesContractAddress,
    signerOrProvider: data,
  })

  if (!traces) {
    return
  }

  return traces
}

export default useTraces
