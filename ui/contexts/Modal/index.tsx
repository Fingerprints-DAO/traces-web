import { createContext, PropsWithChildren, useState } from 'react'

// Dependencies
import { useDisclosure } from '@chakra-ui/react'

export enum ModalElement {
  Mint = 'mint',
  AddNFT = 'add-nft',
  UpdateConfigs = 'update-configs',
  Administrators = 'administrators',
  Default = '',
}

export type ModalContextValue = {
  isOpen?: boolean
  payload?: Partial<{ id: string }>
  element: ModalElement
  handleOpenModal: (element: ModalElement, payload?: ModalContextValue['payload']) => () => void
  handleCloseModal: () => void
}

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_STATE: ModalContextValue = {
  element: ModalElement.Default,
  handleOpenModal: (element: ModalElement, payload?: ModalContextValue['payload']) => () => {},
  handleCloseModal: () => {},
}

const ModalContext = createContext<ModalContextValue>(INITIAL_STATE)

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [payload, setPayload] = useState<ModalContextValue['payload']>({})
  const [element, setElement] = useState<ModalElement>(INITIAL_STATE.element)

  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleOpenModal =
    (element: ModalElement, payload: ModalContextValue['payload'] = {}) =>
    () => {
      setElement(element)
      setPayload(payload)
      onOpen()
    }

  const handleCloseModal = () => {
    setElement(ModalElement.Default)
    onClose()
  }

  const values: ModalContextValue = { element, isOpen, payload, handleOpenModal, handleCloseModal }

  return <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
}

export { ModalContext, ModalProvider }
