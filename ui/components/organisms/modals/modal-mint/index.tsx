import React, { useCallback, useEffect, useMemo, useState } from 'react'

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

type ModalMintProps = {
  isOpen: boolean
  onClose: () => void
}

const fakeMinPrints = 1000

const ModalMint = ({ isOpen, onClose }: ModalMintProps) => {
  const prints = usePrints()
  const { address, printsBalance } = useWallet()

  const [isFetched, setIsFetched] = useState(false)
  const [amount, setAmount] = useState<BigNumber>()
  const [allowance, setAllowance] = useState<BigNumber>()

  const printsApprove = usePrintsApprove()

  const getAllowance = useCallback(async () => {
    try {
      if (prints) {
        const allowance = await prints.allowance(address as Address, process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address)

        setAllowance(allowance)
      }
    } catch (error) {
      console.log('getAllowance', error)
    }
  }, [address, prints])

  useEffect(() => {
    getAllowance()
  }, [getAllowance])

  const canStake = useMemo(() => (allowance?.toNumber() || 0) >= fakeMinPrints, [allowance])

  useEffect(() => {
    if (canStake) {
      setAmount(allowance)
    }
  }, [allowance, canStake, setAmount])

  const canGoToActions = useMemo(() => isFetched || canStake, [canStake, isFetched])

  const handleSubmit = async (data: { amount: number }) => {
    try {
      setIsFetched(true)

      const allowance = await prints?.allowance(address as Address, process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address)
      const allowanceUntilNow = allowance?.toNumber()

      const balanceToApprove = data.amount - (allowanceUntilNow || 0)

      const amount = BigNumber.from(balanceToApprove)

      setAmount(amount)

      await printsApprove.mutateAsync(amount)
    } catch (error) {
      console.log('handleSubmit', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
        <ModalMintHeader showAllowance={false} prints={Number(printsBalance?.formatted || 0)} />
        <ModalBody padding={0}>
          {canGoToActions ? (
            <Actions {...printsApprove} amount={amount} minPrints={fakeMinPrints} onClose={onClose} />
          ) : (
            <Stake minPrints={fakeMinPrints} userPrints={Number(printsBalance?.formatted)} onSubmit={handleSubmit} onClose={onClose} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalMint
