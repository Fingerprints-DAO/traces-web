import React, { useCallback, useEffect, useState } from 'react'

// Dependencies
import { BigNumber } from 'ethers'
import { useAccount, useBalance } from 'wagmi'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

// Components
import Stake from './stake'
import Actions from './actions'
import ModalMintHeader from './header'
import usePrintsRead from '@web3/contracts/prints/use-prints-read'
import usePrintsApprove from '@web3/contracts/prints/use-prints-approve'

type ModalMintProps = {
  isOpen: boolean
  onClose: () => void
}

const printContractAddress = process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ('' as any)

const ModalMint = ({ isOpen, onClose }: ModalMintProps) => {
  const [amount, setAmount] = useState<BigNumber>()

  const { address } = useAccount()
  const { allowance } = usePrintsRead()

  const { write: approvePrints } = usePrintsApprove(amount)
  const { data: balance } = useBalance({ address, enabled: Boolean(address) && Boolean(printContractAddress), token: printContractAddress })

  const handleMint = useCallback(
    (data: { amount: number }) => {
      const allowanceUntilNow = allowance?.toNumber()

      if (typeof allowanceUntilNow !== 'number') {
        return
      }

      const balanceToApprove = data.amount - allowanceUntilNow

      setAmount(BigNumber.from(balanceToApprove))

      approvePrints?.()
    },
    [allowance, approvePrints]
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
        <ModalMintHeader prints={Number(balance?.formatted)} />
        <ModalBody padding={0}>{!!amount ? <Actions amount={amount} onClose={onClose} /> : <Stake prints={Number(balance?.formatted)} onSubmit={handleMint} onClose={onClose} />}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalMint
