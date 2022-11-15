import React from 'react'

// Dependencies
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

type ModalAddNftProps = {
    isOpen: boolean
    onClose: () => void
}

const ModalAddNft = ({ isOpen, onClose }: ModalAddNftProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
                <ModalBody padding={0}></ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalAddNft
