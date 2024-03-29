import React, { useContext } from 'react'
import { object, string } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text } from '@chakra-ui/react'
import { ModalProps } from '@ui/contexts/Modal'
import useTracesUpdateConfigs from '@web3/contracts/traces/use-traces-update-configs'
import { Address } from 'wagmi'
import { isAddress } from 'ethers/lib/utils.js'
import useTxToast from '@ui/hooks/use-tx-toast'
import { TracesContext } from '@ui/contexts/Traces'

export type UpdateConfigsPayload = {
  vaultAddress: `0x${string}`
}

const schema = object({
  vaultAddress: string().required(),
})

const ModalUpdateConfigs = ({ isOpen, onClose }: ModalProps) => {
  const { showTxErrorToast } = useTxToast()
  const { vaultAddress: currentVaultAddress } = useContext(TracesContext)

  const { control, formState, handleSubmit, watch } = useForm<UpdateConfigsPayload>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      vaultAddress: '' as any,
    },
  })

  const form = watch()
  const updateConfigs = useTracesUpdateConfigs(formState.isSubmitted)

  const submit = () => {
    if (!isAddress(form.vaultAddress)) {
      showTxErrorToast(new Error('Invalid address'))
      return
    }
    updateConfigs(form.vaultAddress as Address)
  }

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
              <Text color="gray.100" display="block" as="label" htmlFor="contract" fontWeight="semibold" mb={1}>
                FP Vault Address
              </Text>
              {!!currentVaultAddress && (
                <Text color="gray.400" display="block" fontStyle="italic" fontSize="xs" mb={2}>
                  Current address: {currentVaultAddress}
                </Text>
              )}
              <Controller
                name="vaultAddress"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="lg" borderColor="gray.600" placeholder="Ex: 0xabcdefghijklmnopqrstuvwxyz1234567890abc1" />
                )}
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
