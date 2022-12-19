import { useCallback, useContext, useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import dayjs from 'dayjs'

// Dependencies
import { Box, useToast } from '@chakra-ui/react'
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi'

// Helpers
import useTracesRead from './use-traces-read'
import TracesContract from '@web3/contracts/traces/traces-abi'
import { ModalContext } from '@ui/contexts/Modal'
import { AddNftPayload } from '@ui/components/organisms/modals/modal-add-nft'
import useTxToast from '@ui/hooks/use-tx-toast'

const useTracesAddNft = (isSubmitted: boolean) => {
  const { showTxSentToast, showTxErrorToast } = useTxToast()
  const { isEditor } = useTracesRead()
  const { handleCloseModal } = useContext(ModalContext)
  const [formIsReady, setFormIsReady] = useState(false)
  const [params, setParams] = useState<[`0x${string}`, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] | undefined>(undefined)

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'addToken',
    args: params,
    enabled: isSubmitted && !!isEditor,
  })

  const { write } = useContractWrite({
    ...config,
    onSettled: (data, error) => {
      if (error) {
        showTxErrorToast(error)
        return
      }

      showTxSentToast(data?.hash)
      handleCloseModal()
    },
    onError: showTxErrorToast,
  })

  const setValues = useCallback((payload: AddNftPayload) => {
    if (!!payload) {
      const { ogTokenAddress, ogTokenId, minStake, minHoldPeriod, dutchMultiplier, dutchAuctionDuration } = payload

      setParams([
        ogTokenAddress as Address,
        BigNumber.from(ogTokenId),
        BigNumber.from(minStake),
        BigNumber.from(dayjs.duration(minHoldPeriod, 'day').as('second')),
        BigNumber.from(dutchMultiplier),
        BigNumber.from(dayjs.duration(dutchAuctionDuration, 'day').as('second')),
      ])
      setFormIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (formIsReady && write) {
      write()
    }
  }, [formIsReady, write])

  return [setValues]
}

export default useTracesAddNft
