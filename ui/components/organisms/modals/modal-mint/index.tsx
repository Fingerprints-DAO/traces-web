import React, { useEffect, useState } from 'react'

// Dependencies
import { BigNumber } from 'ethers'
import { useAccount, useBalance } from 'wagmi'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

// Components
import Stake from './stake'
import ModalMintHeader from './header'
import usePrintsApprove from '@web3/contracts/prints/use-prints-approve'
import Actions from './actions'

type ModalMintProps = {
  isOpen: boolean
  onClose: () => void
}

const fakeMinPrints = 1000
const printContractAddress = process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ('' as any)

const ModalMint = ({ isOpen, onClose }: ModalMintProps) => {
  const [canGoToActions, setCanGoToActions] = useState(false)

  const { address } = useAccount()
  const printsApprove = usePrintsApprove(fakeMinPrints)

  const { allowance, isFetched, canStake, setAmount, isFetchedPrepare } = printsApprove

  const { data: balance } = useBalance({ address, enabled: Boolean(address) && Boolean(printContractAddress), token: printContractAddress })

  useEffect(() => {
    if (canStake) {
      if ((allowance?.toNumber() || 0) > 0) {
        setAmount(allowance)
      }
      setCanGoToActions(true)
    }
  }, [allowance, canStake, setAmount])

  const handleSubmit = (data: { amount: number }) => setAmount(BigNumber.from(data.amount))

  useEffect(() => {
    if (isFetched && isFetchedPrepare && !canGoToActions) {
      setCanGoToActions(true)
    }
  }, [isFetched, isFetchedPrepare, canGoToActions])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
        <ModalMintHeader showAllowance={canGoToActions} prints={Number(balance?.formatted || 0)} />
        <ModalBody padding={0}>
          {canGoToActions ? (
            <Actions {...printsApprove} minPrints={fakeMinPrints} onClose={onClose} />
          ) : (
            <Stake minPrints={fakeMinPrints} userPrints={Number(balance?.formatted)} onSubmit={handleSubmit} onClose={onClose} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalMint
