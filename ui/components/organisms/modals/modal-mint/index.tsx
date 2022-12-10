import React, { useEffect, useState } from 'react'

// Dependencies
import { BigNumber } from 'ethers'
import { useAccount, useBalance } from 'wagmi'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

// Components
import Stake from './stake'
import Actions from './actions'
import ModalMintHeader from './header'
import usePrintsRead from '@web3/contracts/prints/use-prints-read'

type ModalMintProps = {
  isOpen: boolean
  onClose: () => void
}

const fakeMinPrints = 1000
const printContractAddress = process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ('' as any)

const ModalMint = ({ isOpen, onClose }: ModalMintProps) => {
  const [amount, setAmount] = useState<BigNumber>()

  const { address } = useAccount()
  const { allowance } = usePrintsRead()
  const { data: balance } = useBalance({ address, enabled: Boolean(address) && Boolean(printContractAddress), token: printContractAddress })

  useEffect(() => {
    if ((allowance?.toNumber() || 0) >= fakeMinPrints) {
      setAmount(allowance)
    }
  }, [allowance])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
        <ModalMintHeader amount={amount?.toNumber()} prints={Number(balance?.formatted)} />
        <ModalBody padding={0}>
          {!!amount?.toNumber() ? (
            <Actions amount={amount!} onClose={onClose} />
          ) : (
            <Stake allowance={allowance} minPrints={fakeMinPrints} userPrints={Number(balance?.formatted)} onSuccess={setAmount} onClose={onClose} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalMint
