import React, { useState } from 'react'

// Dependencies
import { useAccount, useBalance } from 'wagmi'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

// Components
import Stake from './stake'
import Actions from './actions'
import ModalMintHeader from './header'

type ModalMintProps = {
  isOpen: boolean
  onClose: () => void
}

const printContractAddress = process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ('' as any)

const ModalMint = ({ isOpen, onClose }: ModalMintProps) => {
  const [step, setStep] = useState(1)

  const { address } = useAccount()
  const { data: balance } = useBalance({ address, enabled: Boolean(address) && Boolean(printContractAddress), token: printContractAddress })

  const handleMint = (data: { amount: number }) => {
    console.log('data', data)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
        <ModalMintHeader prints={Number(balance?.formatted)} />
        <ModalBody padding={0}>
          {step === 1 && <Stake prints={Number(balance?.formatted)} onSubmit={handleMint} onClose={onClose} />}
          {step === 2 && <Actions onClose={onClose} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalMint
