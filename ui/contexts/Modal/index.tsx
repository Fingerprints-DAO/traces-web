import { createContext, PropsWithChildren, useState } from 'react'

// Dependencies
import { useDisclosure } from '@chakra-ui/react'

export type ModalContextValue = {
  isOpen?: boolean
  element: 'mint' | 'add-nft' | 'update-configs' | ''
  handleOpenModal: (element: ModalContextValue['element']) => () => void
  handleCloseModal: () => void
}

const INITIAL_STATE: ModalContextValue = {
  //   element: '',
  element: 'update-configs',
  handleOpenModal: (element: ModalContextValue['element']) => () => {},
  handleCloseModal: () => {},
}

const ModalContext = createContext<ModalContextValue>(INITIAL_STATE)

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [element, setElement] = useState<ModalContextValue['element']>(INITIAL_STATE.element)

  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleOpenModal = (element: ModalContextValue['element']) => () => {
    setElement(element)
    onOpen()
  }

  const handleCloseModal = () => {
    setElement('')
    onClose()
  }

  const values: ModalContextValue = { element, isOpen: true, handleOpenModal, handleCloseModal }

  return <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
}

export { ModalContext, ModalProvider }
