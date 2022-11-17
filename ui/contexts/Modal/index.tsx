import { createContext, PropsWithChildren, useState } from 'react'

// Dependencies
import { useDisclosure } from '@chakra-ui/react'

export type ModalContextValue = {
    isOpen?: boolean
    element: 'mint' | 'add-nft' | ''
    handleOpenModal: (element: ModalContextValue['element']) => () => void
    handleCloseModal: () => void
}

const ModalContext = createContext<ModalContextValue>({
    element: '',
    handleOpenModal: (element: ModalContextValue['element']) => () => {},
    handleCloseModal: () => {},
})

const ModalProvider = ({ children }: PropsWithChildren) => {
    const [element, setElement] = useState<ModalContextValue['element']>('')

    const { isOpen, onClose, onOpen } = useDisclosure()

    const handleOpenModal = (element: ModalContextValue['element']) => () => {
        setElement(element)
        onOpen()
    }

    const handleCloseModal = () => {
        setElement('')
        onClose()
    }

    const values: ModalContextValue = { element, isOpen, handleOpenModal, handleCloseModal }

    return <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
}

export { ModalContext, ModalProvider }
