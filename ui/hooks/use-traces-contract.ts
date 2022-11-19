// Dependencies
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

// Helpers
import Traces from '@web3/contracts/abi/Traces.json'

const useTracesContract = (functionName: string) => {
    const { config } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_ERC721_MOCK_CONTRACT_ADDRESS,
        abi: Traces,
        functionName,
    })

    return useContractWrite(config)
}

export default useTracesContract
