import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Dependencies
import { Address } from 'wagmi'
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
import { parseAmountToContract, parseAmountToDisplay } from '@web3/helpers/handleAmount'
import { TracesContext } from '@ui/contexts/Traces'

type ModalMintProps = {
  isOpen: boolean
  onClose: () => void
}

const ModalMint = ({ isOpen, onClose }: ModalMintProps) => {
  const { payload } = useContext(ModalContext) as { payload: WNFTModalProps }
  const prints = usePrints()
  const { address, printsBalance } = useWallet()
  const { approveRequest: printsApprove, isApproved } = usePrintsApprove()
  const { tracesContractAddress } = useContext(TracesContext)

  const [formIsFilled, setFormIsFilled] = useState(false)
  const [approveAmount, setApproveAmount] = useState<number>(0)
  const [inputAmount, setInputAmount] = useState<number>(0)
  const [allowance, setAllowance] = useState<number>(0)

  const minPrints = Number(payload.minAmount) ?? 0

  const getAllowance = useCallback(async () => {
    try {
      if (prints) {
        const newAllowance = await prints.allowance(address as Address, tracesContractAddress)

        setAllowance(parseAmountToDisplay(newAllowance?.toString() ?? ''))
      }
    } catch (error) {
      console.log('getAllowance', error)
    }
  }, [address, prints])

  useEffect(() => {
    getAllowance()
  }, [getAllowance])

  const handleSubmit = async ({ amount }: { amount: number }) => {
    try {
      setFormIsFilled(true)
      setInputAmount(amount)

      const currentAllowance = await prints?.allowance(address as Address, tracesContractAddress)
      const balanceToApprove = parseAmountToContract(amount).sub(currentAllowance ?? 0)

      // if the amount to approve is less than 0, it means that the user already approved the amount
      if (balanceToApprove.lte(0)) {
        setApproveAmount(0)
        return
      }

      const isIncrease = currentAllowance && currentAllowance.gt(0)
      setApproveAmount(parseAmountToDisplay(balanceToApprove))
      await printsApprove.mutateAsync({ amount: balanceToApprove, isIncrease })
    } catch (error) {
      setFormIsFilled(false)
      console.log('handleSubmit', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
        <ModalMintHeader showAllowance={allowance > 0} prints={Number(printsBalance?.formatted || 0)} />
        <ModalBody padding={0}>
          {formIsFilled ? (
            // modal with approve and stake buttons
            <Actions
              {...printsApprove}
              waitIsApproved={isApproved}
              approveAmount={approveAmount}
              inputAmount={inputAmount}
              minPrints={minPrints}
              onClose={onClose}
            />
          ) : (
            // modal with stake input
            <Stake userPrints={Number(printsBalance?.formatted)} onSubmit={handleSubmit} onClose={onClose} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalMint
