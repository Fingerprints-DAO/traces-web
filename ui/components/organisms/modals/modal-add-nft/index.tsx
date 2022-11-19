import React from 'react'

// Dependencies
import { Controller, useForm } from 'react-hook-form'
import { number, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, GridItem, Heading, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text } from '@chakra-ui/react'
import useTracesContract from '@ui/hooks/use-traces-contract'

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

// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

const ModalAddNft = ({ isOpen, onClose }: ModalAddNftProps) => {
    const { writeAsync } = useTracesContract('addToken')

    const { control, formState, register, handleSubmit } = useForm<AddNftPayload>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: {
            ogTokenAddress: '',
        },
    })

    const submit = async (data: AddNftPayload) => {
        try {
            console.log('data', data)

            if (!writeAsync) {
                return
            }

            const response = await writeAsync(data as any)

            console.log('response', response)
        } catch (error) {
            console.log('ModalAddNft', error)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
                <form onSubmit={handleSubmit(submit)}>
                    <Box display="flex" flexDirection={['column-reverse', 'row']} alignItems="start" justifyContent="space-between" marginBottom={10}>
                        <Heading size="md" color="gray.100" marginBottom={2}>
                            Add NFT
                        </Heading>
                    </Box>
                    <ModalBody padding={0}>
                        <Box mb={6}>
                            <Text color="gray.100" display="block" as="label" htmlFor="contract" fontWeight="semibold" marginBottom={2}>
                                Contract address
                            </Text>
                            <Controller
                                name="ogTokenAddress"
                                control={control}
                                render={({ field }) => <Input {...field} size="lg" borderColor="gray.600" placeholder="Ex: 0xabcdefghijklmnopqrstuvwxyz1234567890abc1" />}
                            />
                        </Box>
                        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']} gap={6}>
                            <GridItem>
                                <Text color="gray.100" display="block" as="label" htmlFor="amount" fontWeight="semibold" marginBottom={2}>
                                    Token ID
                                </Text>
                                <Controller name="ogTokenId" control={control} render={({ field }) => <Input {...field} size="lg" borderColor="gray.600" placeholder="Ex: abc123" />} />
                            </GridItem>
                            <GridItem>
                                <Text color="gray.100" display="block" as="label" htmlFor="amount" fontWeight="semibold" marginBottom={2}>
                                    Guaranteed Holding Period
                                </Text>
                                <InputGroup>
                                    {/* <Controller name="minHoldPeriod" control={control} render={({ field }) => <Input {...field} type="number" size="lg" borderColor="gray.600" placeholder="Ex: 10" />} /> */}
                                    <Input {...register('minHoldPeriod')} type="number" size="lg" borderColor="gray.600" placeholder="Ex: 10" />
                                    <InputRightAddon background="gray.800" borderColor="gray.600" color="gray.400" height={12}>
                                        Days
                                    </InputRightAddon>
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <Text color="gray.100" display="block" as="label" htmlFor="amount" fontWeight="semibold" marginBottom={2}>
                                    Min. Stake Qty
                                </Text>
                                <InputGroup>
                                    <Controller name="minStake" control={control} render={({ field }) => <Input {...field} type="number" size="lg" borderColor="gray.600" placeholder="Ex: 1000" />} />
                                    <InputRightAddon background="gray.800" borderColor="gray.600" color="gray.400" height={12}>
                                        $PRINTS
                                    </InputRightAddon>
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <Text color="gray.100" display="block" as="label" htmlFor="amount" fontWeight="semibold" marginBottom={2}>
                                    Dutch multiplier
                                </Text>
                                <InputGroup>
                                    <Controller
                                        name="dutchMultiplier"
                                        control={control}
                                        render={({ field }) => <Input {...field} type="number" size="lg" borderColor="gray.600" placeholder="Ex: 10" />}
                                    />
                                    <InputRightAddon background="gray.800" borderColor="gray.600" color="gray.400" height={12}>
                                        x
                                    </InputRightAddon>
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <Text color="gray.100" display="block" as="label" htmlFor="amount" fontWeight="semibold" marginBottom={2}>
                                    Dutch Auction Duration
                                </Text>
                                <InputGroup>
                                    <Controller
                                        name="dutchAuctionDuration"
                                        control={control}
                                        render={({ field }) => <Input {...field} type="number" size="lg" borderColor="gray.600" placeholder="Ex: 100" />}
                                    />
                                    <InputRightAddon background="gray.800" borderColor="gray.600" color="gray.400" height={12}>
                                        seconds
                                    </InputRightAddon>
                                </InputGroup>
                            </GridItem>
                        </Grid>
                    </ModalBody>
                    <ModalFooter padding={0} mt={[10, '72px']} flexDirection={['column', 'row']}>
                        <Text fontSize="xs" flex={1} mb={[6, 0]}>
                            FP Contract checks if the vault set is owner <br />
                            of this NFT when pressing the save button
                        </Text>
                        <Box>
                            <Button colorScheme="red" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" color="gray.900" colorScheme="primary" variant="solid" ml={6}>
                                Add NFT
                            </Button>
                        </Box>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default ModalAddNft
