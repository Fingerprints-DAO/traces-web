import React from 'react'

// Dependencies
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { Box, Button, Container, Flex, Grid, GridItem, Icon, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'

// Components
import ModalMint from '@ui/components/organisms/modals/modal-mint'
import PageHeader from '@ui/components/organisms/page-header'
import CollectionCard from '@ui/components/molecules/collection-card'

const arr = [
  { id: 1, status: 'avaliable' },
  { id: 2, status: 'expiring' },
  { id: 3, status: 'unstake' },
]

const Collection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast({
    isClosable: true,
    position: 'top-right',
  })

  return (
    <>
      <Container maxWidth="7xl" paddingTop={14} paddingBottom={28}>
        <PageHeader
          containerProps={{ marginBottom: 16, maxW: 800 }}
          title="Autoglyphs"
          description="Inspired by Sol LeWitt’s Wall Drawings, Autoglyphs are considered the first “on-chain” generative art collection on the Ethereum blockchain. Created in 2019, once the 512 Autoglyphs were minted, the generator shut itself off. They are a completely self-contained mechanism for the creation and ownership of an artwork."
          withBackButton={true}
        />
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={8} rowGap={12}>
          {arr.map((item) => (
            <GridItem w="100%" key={item.id}>
              <CollectionCard cardWidth={['100%']} image={{ height: '400px', marginBottom: 4 }}>
                <Box marginTop={6} flex={1} display="flex" flexDirection="column">
                  {item.status === 'avaliable' ? (
                    <>
                      <Box marginBottom={4}>
                        <Text color="gray.200">Minimum stake</Text>
                        <Text color="gray.100" fontWeight={600}>
                          1000 PRINTS
                        </Text>
                      </Box>
                      <Box marginBottom={6}>
                        <Text color="gray.200">Guaranteed holding period</Text>
                        <Text color="gray.100" fontWeight={600}>
                          10 days
                        </Text>
                      </Box>
                      <Button color="gray.900" colorScheme="primary" width="full" marginTop="auto" onClick={onOpen}>
                        Mint WNFT
                      </Button>
                    </>
                  ) : item.status === 'expiring' ? (
                    <>
                      <Box marginBottom={4}>
                        <Text color="gray.200">Staked</Text>
                        <Flex alignItems="baseline">
                          <Text color="gray.100" fontWeight={600} marginRight={2}>
                            1500 PRINTS
                          </Text>
                          <Tooltip
                            label="The value decrease every day until reachs $value at day $date"
                            fontSize="sm"
                            color="gray.50"
                            textAlign="center"
                            placement="top-start"
                            hasArrow={true}
                            arrowSize={8}
                          >
                            <span>
                              <Icon as={BsArrowDownRightCircle} color="gray.300" boxSize={3} />
                            </span>
                          </Tooltip>
                        </Flex>
                      </Box>
                      <Box marginBottom={4}>
                        <Text color="gray.200">Holding during</Text>
                        <Text color="gray.100" fontWeight={600}>
                          20 days
                        </Text>
                      </Box>
                      <Box marginBottom={6}>
                        <Text color="gray.200">Current holder</Text>
                        <Text color="gray.100" fontWeight={600}>
                          sandrini.eth
                        </Text>
                      </Box>
                      <Button disabled={true} borderColor="gray.200" color="gray.200" colorScheme="primary" variant="outline" width="full" marginTop="auto">
                        72 hours to outbid
                      </Button>
                    </>
                  ) : (
                    <>
                      <Box marginBottom={4}>
                        <Text color="gray.200">Value to outbid</Text>
                        <Flex alignItems="baseline">
                          <Text color="gray.100" fontWeight={600} marginRight={2}>
                            1500 PRINTS
                          </Text>
                          <Tooltip
                            label="The value decrease every day until reachs $value at day $date"
                            fontSize="sm"
                            color="gray.50"
                            textAlign="center"
                            placement="top-start"
                            hasArrow={true}
                            arrowSize={8}
                          >
                            <span>
                              <Icon as={BsArrowDownRightCircle} color="gray.300" boxSize={3} />
                            </span>
                          </Tooltip>
                        </Flex>
                      </Box>
                      <Box marginBottom={4}>
                        <Text color="gray.200">Holding during</Text>
                        <Text color="gray.100" fontWeight={600}>
                          10 days
                        </Text>
                      </Box>
                      <Box marginBottom={6}>
                        <Text color="gray.200">Current holder</Text>
                        <Text color="gray.100" fontWeight={600}>
                          sandrini.eth
                        </Text>
                      </Box>
                      <Button color="gray.900" colorScheme="primary" width="full" marginTop="auto">
                        Outbid WNFT
                      </Button>
                    </>
                  )}
                </Box>
              </CollectionCard>
            </GridItem>
          ))}
        </Grid>
      </Container>
      {isOpen && (
        <ModalMint
          isOpen={isOpen}
          onClose={() => {
            onClose()
            // toast({
            //   title: 'WNFT Minted',
            //   status: 'success',
            //   description: (
            //     <>
            //       <Text mb={4}>You have sucesfully... better text </Text>
            //       <Box as="a" href="https://fake.com" target="_blank" textDecoration="underline">
            //         Click here to see transaction
            //       </Box>
            //     </>
            //   ),
            // })
          }}
        />
      )}
    </>
  )
}

export default Collection
