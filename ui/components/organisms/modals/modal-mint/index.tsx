import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Dependencies
import { Address } from 'wagmi'
import { BigNumber } from 'ethers'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

// Components
import Stake from './stake'
import Actions from './actions'
import ModalMintHeader from './header'

// Helpers
import useWallet from '@web3/wallet/use-wallet'
import usePrints from '@web3/contracts/prints/use-prints'
import usePrintsApprove from '@web3/contracts/prints/use-prints-approve'
import { ModalContext, WNFTModalProps } from '@ui/contexts/Modal'

type ModalMintProps = {
  isOpen: boolean
  onClose: () => void
}

const ModalMint = ({ isOpen, onClose }: ModalMintProps) => {
  const { payload } = useContext(ModalContext) as { payload: WNFTModalProps }
  const prints = usePrints()
  const { address, printsBalance } = useWallet()
  const printsApprove = usePrintsApprove()

  const [isFetched, setIsFetched] = useState(false)
  const [amount, setAmount] = useState<number>(0)
  const [allowance, setAllowance] = useState<number>(0)

  const minPrints = Number(payload.minAmount) ?? 0
  const canStake = useMemo(() => allowance >= minPrints, [allowance, minPrints])
  const canGoToActions = useMemo(() => isFetched || canStake, [canStake, isFetched])

  const getAllowance = useCallback(async () => {
    try {
      if (prints) {
        const newAllowance = await prints.allowance(address as Address, process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address)

        setAllowance(newAllowance?.toNumber() ?? 0)
      }
    } catch (error) {
      console.log('getAllowance', error)
    }
  }, [address, prints])

  useEffect(() => {
    getAllowance()
  }, [getAllowance])

  useEffect(() => {
    if (canStake) {
      setAmount(allowance)
    }
  }, [allowance, canStake, setAmount])

  const handleSubmit = async (data: { amount: number }) => {
    try {
      setIsFetched(true)

      const currentAllowance = await prints?.allowance(address as Address, process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address)
      const allowanceUntilNow = currentAllowance?.toNumber()

      const balanceToApprove = data.amount - (allowanceUntilNow || 0)
      const isIncrease = balanceToApprove !== amount
      await printsApprove.mutateAsync({ amount: BigNumber.from(balanceToApprove), isIncrease })
    } catch (error) {
      console.log('handleSubmit', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
        <ModalMintHeader showAllowance={allowance > 0} prints={Number(printsBalance?.formatted || 0)} />
        <ModalBody padding={0}>
          {canGoToActions ? (
            <Actions {...printsApprove} amount={amount} minPrints={minPrints} onClose={onClose} />
          ) : (
            <Stake userPrints={Number(printsBalance?.formatted)} onSubmit={handleSubmit} onClose={onClose} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalMint
