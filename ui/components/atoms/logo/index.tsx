import React from 'react'

// Dependencies
import Link from 'next/link'
import { Heading } from '@chakra-ui/react'

const Logo = () => {
    return (
        <Link href="/">
            <Heading as="a" href="/" color="gray.100" size="md">
                Traces
            </Heading>
        </Link>
    )
}

export default Logo
