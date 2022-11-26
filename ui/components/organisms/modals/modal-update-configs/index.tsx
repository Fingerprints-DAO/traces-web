import React from 'react'

// Dependencies
import { number, object, string } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, useToast } from '@chakra-ui/react'

// Helpers
import useTracesAddNft from '@ui/hooks/use-traces-add-nft'

type ModalAddNftProps = {
  isOpen: boolean
  onClose: () => void
}

export type AddNftPayload = {
  ogTokenAddress: string
  ogTokenId: number
  minStake: number
  minHoldPeriod: number
  dutchMultiplier: number
  dutchAuctionDuration: number
}

const schema = object({
  ogTokenAddress: string().required(),
  ogTokenId: number().required(),
  minStake: number().required(),
  minHoldPeriod: number().required(),
  dutchMultiplier: number().required(),
  dutchAuctionDuration: number().required(),
})

const ModalUpdateConfigs = ({ isOpen, onClose }: ModalAddNftProps) => {
  const { control, formState, handleSubmit, watch } = useForm<AddNftPayload>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      ogTokenAddress: '',
    },
  })

  const form = watch()

  const addNft = useTracesAddNft(formState.isSubmitted, form)

  const submit = () => addNft && addNft()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
        <form onSubmit={handleSubmit(submit)}>
          <Box display="flex" flexDirection={['column-reverse', 'row']} alignItems="start" justifyContent="space-between" marginBottom={10}>
            <Heading size="md" color="gray.100" marginBottom={2}>
              Update configs
            </Heading>
          </Box>
          <ModalBody padding={0}>
            <Box>
              <Text color="gray.100" display="block" as="label" htmlFor="contract" fontWeight="semibold" marginBottom={2}>
                FP Vault Address
              </Text>
              <Controller
                name="ogTokenAddress"
                control={control}
                render={({ field }) => <Input {...field} size="lg" borderColor="gray.600" placeholder="Ex: 0xabcdefghijklmnopqrstuvwxyz1234567890abc1" />}
              />
            </Box>
          </ModalBody>
          <ModalFooter padding={0} mt={[10, '64px']} flexDirection="row">
            <Button size={['md', 'lg']} colorScheme="red" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button size={['md', 'lg']} type="submit" color="gray.900" colorScheme="primary" variant="solid" ml={4}>
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ModalUpdateConfigs
