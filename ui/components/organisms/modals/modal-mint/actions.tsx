import React, { useEffect, useState } from 'react'

// Dependencies
import { BsCheck2Circle } from 'react-icons/bs'
import { Box, Button, Icon, ModalFooter, Spinner, Text } from '@chakra-ui/react'

type Status = 'waiting' | 'loading' | 'done'

type ActionsProps = {
  onClose: () => void
}

const Actions = ({ onClose }: ActionsProps) => {
  const [action, setAction] = useState(1)
  const [actionOneStatus, setActionOneStatus] = useState<Status>('waiting')
  const [actionTwoStatus, setActionTwoStatus] = useState<Status>('waiting')

  useEffect(() => {
    if (actionTwoStatus === 'done') {
      onClose()
    }
  }, [actionTwoStatus, onClose])

  return (
    <>
      <Box>
        <Box alignItems="baseline" display="flex" mb={10} color="gray.100">
          <Box w={8} h={8} borderRadius="50%" border="1px" borderColor="gray.50" display="flex" alignItems="center" justifyContent="center" mr={4}>
            <Text as="span">1</Text>
          </Box>
          <Box flex={1}>
            <Box display="flex" alignItems="center">
              <Text fontSize="xl">Please confirm the approval of 3000 $PRINTS</Text>
              {actionOneStatus === 'done' && <Icon as={BsCheck2Circle} color="green.500" boxSize="7" ml={4} />}
            </Box>
            {action === 1 && (
              <Box mt={4}>
                {actionOneStatus === 'waiting' && (
                  <Button
                    color="gray.900"
                    colorScheme="primary"
                    variant="solid"
                    size="lg"
                    onClick={() => {
                      setActionOneStatus('loading')
                      setTimeout(() => {
                        setAction(2)
                        setActionOneStatus('done')
                      }, 2000)
                    }}
                  >
                    Confirm
                  </Button>
                )}
                {actionOneStatus === 'loading' && (
                  <>
                    <Text fontSize="lg" as="span" fontWeight="semibold">
                      waiting for approval
                    </Text>
                    <Spinner ml={2} size="sm" speed="0.7s" />
                  </>
                )}
              </Box>
            )}
          </Box>
        </Box>
        <Box alignItems="baseline" display="flex" color={action === 1 ? 'gray.500' : 'gray.100'}>
          <Box w={8} h={8} borderRadius="50%" border="1px" borderColor="currentColor" display="flex" alignItems="center" justifyContent="center" mr={4}>
            <Text as="span">2</Text>
          </Box>
          <Box flex={1}>
            <Text fontSize="xl">Please confirm the stake of 5000 $PRINTS</Text>
            {action === 2 && (
              <Box mt={4}>
                {actionTwoStatus === 'waiting' && (
                  <Button
                    color="gray.900"
                    colorScheme="primary"
                    variant="solid"
                    size="lg"
                    onClick={() => {
                      setActionTwoStatus('loading')
                      setTimeout(() => {
                        setAction(2)
                        setActionTwoStatus('done')
                      }, 2000)
                    }}
                  >
                    Confirm
                  </Button>
                )}
                {actionTwoStatus === 'loading' && (
                  <>
                    <Text fontSize="lg" as="span" fontWeight="semibold">
                      waiting for approval
                    </Text>
                    <Spinner ml={2} size="sm" speed="0.7s" />
                  </>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <ModalFooter padding={0} mt={[10, '24']}>
        <Button borderColor="gray.200" color="gray.200" colorScheme="primary" variant="outline" size="md" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  )
}

export default Actions
