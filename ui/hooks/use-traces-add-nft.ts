// Dependencies
import { useToast } from '@chakra-ui/react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

// Helpers
import Traces from '@web3/contracts/abi/Traces.json'
import { AddNftPayload } from '@ui/components/organisms/modals/modal-add-nft'
import { useContext, useState } from 'react'
import { ModalContext } from '@ui/contexts/Modal'
import useTracesRead from './use-traces-read'

const useTracesAddNft = (isSubmitted: boolean, payload: AddNftPayload) => {
  const toast = useToast()
  const { isEditor } = useTracesRead()
  const { handleCloseModal } = useContext(ModalContext)

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: Traces,
    functionName: 'addToken',
    args: [process.env.NEXT_PUBLIC_ERC721_MOCK_CONTRACT_ADDRESS, payload?.ogTokenId, payload?.minStake, payload?.minHoldPeriod, payload?.dutchMultiplier, payload?.dutchAuctionDuration],
    enabled: isSubmitted && !!isEditor && !!payload,
  })

  const { write } = useContractWrite({
    ...config,
    onSettled: (_, error) => {
      if (!error) {
        toast({ title: 'Agora sim seu cagão', status: 'success' })
        handleCloseModal()
      }
    },
    onError: () => {
      toast({ title: 'Você fez merda', status: 'error' })
    },
  })

  return write
}

export default useTracesAddNft
