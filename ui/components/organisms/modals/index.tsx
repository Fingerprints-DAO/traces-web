import React, { useContext, useMemo } from 'react'

// Dependencies
import { ModalContext, ModalContextValue, ModalElement } from '@ui/contexts/Modal'

// Components
import ModalMint from './modal-mint'
import ModalAddNft from './modal-add-nft'
import ModalUpdateConfigs from './modal-update-configs'
import ModalAdministrators from './modal-administrators'

const Modal = () => {
  const { element, payload, isOpen, handleCloseModal } = useContext(ModalContext)

  const Component = useMemo(() => {
    const map = new Map<ModalContextValue['element'], any>([
      [ModalElement.AddNFT, ModalAddNft],
      [ModalElement.Mint, ModalMint],
      [ModalElement.UpdateConfigs, ModalUpdateConfigs],
      [ModalElement.Administrators, ModalAdministrators],
    ])

    return map.get(element)
  }, [element])

  if (!Component) {
    return null
  }

  return <Component payload={payload} isOpen={isOpen} onClose={handleCloseModal} />
}

export default Modal
