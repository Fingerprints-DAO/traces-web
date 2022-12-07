import { useContext } from 'react'

// Dependencies
import { useToast } from '@chakra-ui/react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

// Helpers
import { ModalContext } from '@ui/contexts/Modal'
import PrintsContract from '@web3/contracts/prints/contract'
import { AddNftPayload } from '@ui/components/organisms/modals/modal-add-nft'

const useTracesMintNft = (isSubmitted: boolean, payload: AddNftPayload) => {
  const toast = useToast()
  const { handleCloseModal } = useContext(ModalContext)

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS,
    abi: PrintsContract,
    functionName: 'allowance',
    args: [],
    // enabled: isSubmitted && !!payload,
  })

  const { write } = useContractWrite({
    ...config,
    onSettled: (_, error) => {
      if (!error) {
        // toast({ title: 'Agora sim seu cagão', status: 'success' })
        // handleCloseModal()
      }
    },
    onError: () => {
      //   toast({ title: 'Você fez merda', status: 'error' })
    },
  })

  return write
}

export default useTracesMintNft
