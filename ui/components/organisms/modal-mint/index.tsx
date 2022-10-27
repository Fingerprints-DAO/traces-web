import React, { useState } from 'react'

// Dependencies
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

// Components
import Stake from './stake'
import Actions from './actions'
import ModalMintHeader from './header'

type ModalMintProps = {
  isOpen: boolean
  onClose: () => void
}

const ModalMint = ({ isOpen, onClose }: ModalMintProps) => {
  const [step, setStep] = useState(1)

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        padding={[6, 12]}
        minW={['unset', 650]}
        maxW={['90%', '90%', '90%', 'md']}
      >
        <ModalMintHeader />
        <ModalBody padding={0}>
          {step === 1 && <Stake onClick={() => setStep(2)} onClose={onClose} />}
          {step === 2 && <Actions onClose={onClose} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalMint
