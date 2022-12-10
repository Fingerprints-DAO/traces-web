import { useContext } from 'react'

// Dependencies
import { useToast } from '@chakra-ui/react'
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi'

// Helpers
import useTracesRead from './use-traces-read'
import TracesContract from '@web3/contracts/traces/contract'
import { ModalContext } from '@ui/contexts/Modal'
import { AddNftPayload } from '@ui/components/organisms/modals/modal-add-nft'
import { BigNumber } from 'ethers'

const useTracesAddNft = (isSubmitted: boolean, payload: AddNftPayload) => {
  const toast = useToast()
  const { isEditor } = useTracesRead()
  const { handleCloseModal } = useContext(ModalContext)

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'addToken',
    args: [
      payload?.ogTokenAddress as Address,
      payload?.ogTokenId as any,
      payload?.minStake as any,
      payload?.minHoldPeriod as any,
      payload?.dutchMultiplier as any,
      BigNumber.from(payload?.dutchAuctionDuration).mul(60),
    ],
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
