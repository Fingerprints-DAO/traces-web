import React, { useContext, useMemo } from 'react'

// Dependencies
import { ModalContext, ModalContextValue } from '@ui/contexts/Modal'

// Components
import ModalMint from './modal-mint'
import ModalAddNft from './modal-add-nft'

const Modals = () => {
    const { element, isOpen, handleCloseModal } = useContext(ModalContext)

    const Component = useMemo(() => {
        const map = new Map<ModalContextValue['element'], any>([
            ['add-nft', ModalAddNft],
            ['mint', ModalMint],
        ])

        return map.get(element)
    }, [element])

    if (!Component) {
        return null
    }

    return <Component isOpen={isOpen} onClose={handleCloseModal} />
}

export default Modals
