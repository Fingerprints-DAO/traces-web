import React, { useContext } from 'react'
import { number, object } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightAddon, ModalFooter, Text } from '@chakra-ui/react'
import { ModalContext, WNFTModalProps } from '@ui/contexts/Modal'

type StakeProps = {
  onClose: () => void
  onSubmit: (data: { amount: number }) => void
  userPrints?: number
}

const Stake = ({ userPrints = 0, onClose, onSubmit }: StakeProps) => {
  const { payload } = useContext(ModalContext) as { payload: WNFTModalProps }
  const minPrints = payload.minAmount ?? 0

  const schema = object({
    amount: number()
      .min(minPrints, `Minimum amount allowed is ${minPrints.toLocaleString()} $PRINTS`)
      .max(userPrints, 'This value is bigger than your current balance')
      .required(),
  })

  const { control, formState, handleSubmit } = useForm<{ amount: number }>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      amount: minPrints,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Text color="gray.100" display="block" as="label" htmlFor="amount" fontWeight="semibold" marginBottom={2}>
          Amount to stake
        </Text>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <FormControl isInvalid={Boolean(formState.errors.amount?.message)}>
              <InputGroup size="lg" marginBottom={2}>
                <Input {...field} type="number" placeholder="Amount to stake" size="lg" />
                <InputRightAddon background="gray.800" borderLeft={1} borderLeftColor="gray.600" color="gray.400">
                  $PRINTS
                </InputRightAddon>
              </InputGroup>
              {Boolean(formState.errors.amount?.message) && <FormErrorMessage mb={4}>{formState.errors.amount?.message}</FormErrorMessage>}
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
        <Button type="submit" color="gray.900" colorScheme="primary" variant="solid" ml={6}>
          Confirm stake
        </Button>
      </ModalFooter>
    </form>
  )
}

export default Stake
