import React, { useMemo, useState } from 'react'
import { Address } from 'wagmi'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Select,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react'
import { ModalProps } from '@ui/contexts/Modal'
import useTracesRead from '@web3/contracts/traces/use-traces-read'
import useTracesAddRole from '@web3/contracts/traces/use-traces-add-role'

export type AddRolePayload = {
  role: Address
  account: Address
}

const schema = object({
  account: string().required(),
  role: string().required(),
})

const ModalAddRole = ({ isOpen, onClose }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { adminRole, editorRole, isAdmin, isEditor } = useTracesRead()
  const { mutateAsync: addRole } = useTracesAddRole(isAdmin, isEditor, adminRole, onClose)

  const options = useMemo(() => {
    const roles = [{ value: editorRole, label: 'Editor' }]

    if (isAdmin) {
      roles.unshift({ value: adminRole, label: 'Admin' })
    }

    return roles
  }, [editorRole, adminRole, isAdmin])

  const { formState, handleSubmit, register } = useForm<AddRolePayload>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      account: '' as Address,
      role: '' as Address,
    },
  })

  const submit = async (data: AddRolePayload) => {
    try {
      setIsLoading(true)

      await addRole(data)
    } catch (error) {
      console.log('submit', error)

      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
        <form onSubmit={handleSubmit(submit)}>
          <Box display="flex" flexDirection={['column-reverse', 'row']} alignItems="start" justifyContent="space-between" marginBottom={10}>
            <Heading size="md" color="gray.100" marginBottom={2}>
              Add Role
            </Heading>
          </Box>
          <ModalBody padding={0}>
            <Flex flexDirection={['column', 'row']}>
              <FormControl flex={2} mb={[4, 0]} mr={[0, 6]} isInvalid={Boolean(formState.errors.account?.message)}>
                <Text color="gray.100" display="block" as="label" htmlFor="contract" fontWeight="semibold" marginBottom={2}>
                  Wallet
                </Text>
                <Input {...register('account')} size="lg" borderColor="gray.600" placeholder="Ex: 0xabcdefghijklmnopqrstuvwxyz1234567890abc1" />
                {Boolean(formState.errors.account?.message) && <FormErrorMessage>{formState.errors.account?.message}</FormErrorMessage>}
              </FormControl>
              <FormControl flex={1} isInvalid={Boolean(formState.errors.role?.message)}>
                <Text color="gray.100" display="block" as="label" htmlFor="contract" fontWeight="semibold" marginBottom={2}>
                  Role
                </Text>
                <Select {...register('role')} borderColor="gray.600" size="lg" placeholder="Select an option">
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {Boolean(formState.errors.role?.message) && <FormErrorMessage>{formState.errors.role?.message}</FormErrorMessage>}
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter padding={0} mt={10} flexDirection="row">
            <Button size={['md', 'lg']} colorScheme="red" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} size={['md', 'lg']} type="submit" color="gray.900" colorScheme="primary" variant="solid" ml={4}>
              {isLoading ? 'Adding...' : 'Add Role'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ModalAddRole
