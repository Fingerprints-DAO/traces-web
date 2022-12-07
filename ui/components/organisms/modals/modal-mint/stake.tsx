import React, { useMemo } from 'react'

// Dependencies
import get from 'lodash/get'
import { BigNumber } from 'ethers'
import { number, object } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightAddon, ModalFooter, Text } from '@chakra-ui/react'

type StakeProps = {
  amountHook: [BigNumber | undefined, React.Dispatch<React.SetStateAction<BigNumber | undefined>>]
  onClose: () => void
  onSubmit: () => void
  allowance?: BigNumber
  prints?: number
}

const fakeMinPrints = 1000

const Stake = ({ allowance, amountHook, prints = 0, onClose, onSubmit }: StakeProps) => {
  const schema = object({
    amount: number().min(fakeMinPrints, `Minimum amount allowed is ${fakeMinPrints.toLocaleString()} $PRINTS`).max(prints, 'This value is bigger than your current balance').required('Required field'),
  })

  const { control, formState, handleSubmit } = useForm<{ amount: number }>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const error = useMemo(() => get(formState.errors, 'amount'), [formState.errors])

  const submit = (data: { amount: number }) => {
    const [, setAmount] = amountHook

    const allowanceUntilNow = allowance?.toNumber()

    if (typeof allowanceUntilNow !== 'number') {
      return
    }

    const balanceToApprove = data.amount - allowanceUntilNow

    setAmount(BigNumber.from(balanceToApprove))

    onSubmit()
  }

  return (
    <>
      <Box>
        <Text color="gray.100" display="block" as="label" htmlFor="amount" fontWeight="semibold" marginBottom={2}>
          Amount to stake
        </Text>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <FormControl isInvalid={Boolean(error?.message)}>
              <InputGroup size="lg" marginBottom={2}>
                <Input {...field} type="number" placeholder="Amount to stake" size="lg" />
                <InputRightAddon background="gray.800" borderLeft={1} borderLeftColor="gray.600" color="gray.400">
                  $PRINTS
                </InputRightAddon>
              </InputGroup>
              {Boolean(error?.message) && <FormErrorMessage mb={4}>{error?.message}</FormErrorMessage>}
            </FormControl>
          )}
        />
        <Text color="gray.300" fontSize="sm">
          Minimun of {fakeMinPrints.toLocaleString()} $PRINTS for this WNFT
        </Text>
      </Box>
      <ModalFooter padding={0} mt={[10, '24']}>
        <Button colorScheme="red" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button color="gray.900" colorScheme="primary" variant="solid" ml={6} onClick={handleSubmit(submit)}>
          Confirm stake
        </Button>
      </ModalFooter>
    </>
  )
}

export default Stake
