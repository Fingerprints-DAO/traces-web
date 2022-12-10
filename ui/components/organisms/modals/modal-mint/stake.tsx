import React, { useMemo } from 'react'

// Dependencies
import get from 'lodash/get'
import { BigNumber } from 'ethers'
import { number, object } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightAddon, ModalFooter, Text, useToast } from '@chakra-ui/react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import PrintsContract from '@web3/contracts/prints/contract'

type StakeProps = {
  onClose: () => void
  onSuccess: (amount: BigNumber) => void
  minPrints: number
  userPrints?: number
  allowance?: BigNumber
}

const Stake = ({ allowance, minPrints, userPrints = 0, onClose, onSuccess }: StakeProps) => {
  const toast = useToast()

  const schema = object({
    amount: number()
      .min(minPrints, `Minimum amount allowed is ${minPrints.toLocaleString()} $PRINTS`)
      .max(userPrints, 'This value is bigger than your current balance')
      .required(),
  })

  const { control, formState, handleSubmit, watch } = useForm<{ amount: number }>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const amount = watch('amount')

  const amountBN = useMemo(() => {
    const allowanceUntilNow = allowance?.toNumber()

    const balanceToApprove = (amount || 0) - (allowanceUntilNow || 0)

    return BigNumber.from(balanceToApprove)
  }, [allowance, amount])

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS,
    abi: PrintsContract,
    functionName: 'approve',
    enabled: amountBN.toNumber() > 0,
    args: [process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as `0x${string}`, amountBN!],
  })

  const {
    data: approved,
    isSuccess: isSuccessApprove,
    isLoading: isLoadingWrite,
    write: approvePrints,
  } = useContractWrite({
    ...config,
    onError: () => {
      toast({ title: 'Error', description: 'Transaction error', status: 'error' })
    },
  })

  const { isLoading: isLoadingWaitingApprove } = useWaitForTransaction({
    hash: approved?.hash,
    enabled: isSuccessApprove,
    onSettled: (data, error) => {
      if (!error) {
        onSuccess(amountBN)
      }
    },
  })

  const formError = useMemo(() => get(formState.errors, 'amount'), [formState.errors])

  const submit = () => {
    approvePrints?.()
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box>
        <Text color="gray.100" display="block" as="label" htmlFor="amount" fontWeight="semibold" marginBottom={2}>
          Amount to stake
        </Text>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <FormControl isInvalid={Boolean(formError?.message)}>
              <InputGroup size="lg" marginBottom={2}>
                <Input {...field} type="number" placeholder="Amount to stake" size="lg" />
                <InputRightAddon background="gray.800" borderLeft={1} borderLeftColor="gray.600" color="gray.400">
                  $PRINTS
                </InputRightAddon>
              </InputGroup>
              {Boolean(formError?.message) && <FormErrorMessage mb={4}>{formError?.message}</FormErrorMessage>}
            </FormControl>
          )}
        />
        <Text color="gray.300" fontSize="sm">
          Minimun of {minPrints.toLocaleString()} $PRINTS for this WNFT
        </Text>
      </Box>
      <ModalFooter padding={0} mt={[10, '24']}>
        <Button colorScheme="red" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isLoadingWrite || isLoadingWaitingApprove || !approvePrints}
          type="submit"
          color="gray.900"
          colorScheme="primary"
          variant="solid"
          ml={6}
        >
          {isLoadingWaitingApprove || isLoadingWrite ? 'Confirming approve...' : 'Confirm stake'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default Stake
