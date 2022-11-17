import React, { PropsWithChildren } from 'react'

// Dependencies
import Link from 'next/link'
import { Box, Button, Heading, Text } from '@chakra-ui/react'

type CollectionCardProps = {
    path?: string
    cardWidth?: Array<string | number>
    image?: Partial<{
        height: string
        marginBottom: number
    }>
}

const CollectionCard = ({ path, cardWidth = ['100%', 96], image, children }: PropsWithChildren<CollectionCardProps>) => {
    const Component = path ? Link : Box

    return (
        <Component href={path as any} height="full">
            <Box as={path ? 'a' : 'div'} display="flex" flexDirection="column" height="full" width={cardWidth} color="gray.100" cursor={path ? 'pointer' : 'default'}>
                <Box width="100%" height={image?.height || '549px'} marginBottom={image?.marginBottom || 6} background="gray.500" borderRadius={8} />
                <Heading as="h6" size="md" marginBottom={2}>
                    Autoglyphs
                </Heading>
                {children || <Text fontSize="xs">Larva labs</Text>}
            </Box>
        </Component>
    )
}

export default CollectionCard
