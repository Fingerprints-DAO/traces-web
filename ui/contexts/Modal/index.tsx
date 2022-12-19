import { createContext, PropsWithChildren, useState } from 'react'

// Dependencies
import { useDisclosure } from '@chakra-ui/react'
import { Address, useWaitForTransaction } from 'wagmi'
import useTxToast from '@ui/hooks/use-tx-toast'

export enum ModalElement {
  Mint,
  AddNFT,
  UpdateConfigs,
  Administrators,
  Default,
}

export type WNFTModalProps = {
  id: string
  name: string
  minAmount: string
  ogTokenAddress: Address
  ogTokenId: string
}
export type ModalContextValue = {
  isOpen?: boolean
  payload?: WNFTModalProps | {}
  element: ModalElement
  handleOpenModal: (element: ModalElement, payload?: ModalContextValue['payload']) => () => void
  handleCloseModal: (hash?: Address, callback?: Function) => void
}

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_STATE: ModalContextValue = {
  element: ModalElement.Default,
  handleOpenModal: () => () => {},
  handleCloseModal: () => {},
}

const ModalContext = createContext<ModalContextValue>(INITIAL_STATE)

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [payload, setPayload] = useState<ModalContextValue['payload']>({})
  const [element, setElement] = useState<ModalElement>(INITIAL_STATE.element)
  const { showTxErrorToast, showTxExecutedToast } = useTxToast()
  const [lastTxHash, setLastTxHash] = useState<Address | undefined>(undefined)
  const [lastTxCallback, setLastTxCallback] = useState<Function | undefined>(undefined)

  const { isOpen, onClose, onOpen } = useDisclosure()

  useWaitForTransaction({
    hash: lastTxHash,
    onSettled(_, error) {
      console.log(_, error, lastTxHash)
      if (error) {
        showTxErrorToast(error)
        return
      }

      lastTxCallback && lastTxCallback()
    },
  })

  const handleOpenModal =
    (element: ModalElement, payload: ModalContextValue['payload'] = {}) =>
    () => {
      setElement(element)
      setPayload(payload)
      onOpen()
    }

  const handleCloseModal = (hash?: Address, callback?: Function) => {
    setElement(INITIAL_STATE.element)
    setPayload(INITIAL_STATE.payload)
    onClose()
    setLastTxHash(hash)
    setLastTxCallback(callback)
  }

  const values = { element, isOpen, payload, handleOpenModal, handleCloseModal }

  return <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
}

export { ModalContext, ModalProvider }
