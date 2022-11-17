import React from 'react'

// Dependencies
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Drawer as ChakraDrawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Heading, Box, Text } from '@chakra-ui/react'

// Components
import Wallet from '@ui/components/molecules/wallet'

type DrawerProps = {
    isOpen: boolean
    onClose: () => void
    onOpenAddNftModal: () => void
}

const nav = [{ path: '/', label: 'Homepage' }, { path: '/profile', label: 'Profile' }, { path: '/collections', label: 'Collections' }, { label: 'Add NFT' }]

const Drawer = ({ isOpen, onClose, onOpenAddNftModal }: DrawerProps) => {
    const router = useRouter()

    const activeStyles = (path: string) => {
        if (router.pathname === path) {
            return {
                fontSize: 30,
                fontWeight: 700,
            }
        }

        return {
            fontSize: 24,
        }
    }

    return (
        <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent backgroundColor="gray.900" maxWidth={400}>
                <DrawerHeader alignItems="center" display="flex" justifyContent="space-between" padding={8} mb={4}>
                    <Heading as="h1" color="gray.50" size="xl" flex={1}>
                        Traces
                    </Heading>
                    <DrawerCloseButton position="static" />
                </DrawerHeader>
                <DrawerBody px={8}>
                    <Box as="nav">
                        {nav.map((item, index) => {
                            if (!item.path) {
                                return (
                                    <Box key={index} as="button" display="block" lineHeight={9} fontSize={24} onClick={onOpenAddNftModal}>
                                        {item.label}
                                    </Box>
                                )
                            }

                            return (
                                <Link key={item.path} href={item.path} legacyBehavior={true}>
                                    <Box as="a" href={item.path} display="block" lineHeight={9} {...activeStyles(item.path)} mb={10}>
                                        {item.label}
                                    </Box>
                                </Link>
                            )
                        })}
                    </Box>
                </DrawerBody>
                <DrawerFooter p={8}>
                    <Wallet variant="drawer" />
                </DrawerFooter>
            </DrawerContent>
        </ChakraDrawer>
    )
}

export default Drawer
