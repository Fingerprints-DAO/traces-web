import React from 'react'

// Dependencies
import { Box, BoxProps, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

type PageHeaderProps = {
  title: string
  description?: string
  onClickBack?: () => void
  containerProps?: BoxProps
}

const PageHeader = ({ description, title, containerProps, onClickBack }: PageHeaderProps) => {
  const router = useRouter()

  const handleBack = () => onClickBack || router.back()

  return (
    <Box {...containerProps}>
      <Flex as="button" alignItems="center" marginBottom={8} onClick={handleBack}>
        <Icon boxSize={6} as={ArrowBackIcon} color="gray.400" marginRight={2} />
        <Text color="gray.400" fontSize="sm" borderBottom="1px solid" borderBottomColor="gray.400">
          go back
        </Text>
      </Flex>
      <Heading as="h1" size="3xl">
        {title}
      </Heading>
      {Boolean(description) && (
        <Text color="gray.400" marginTop={6}>
          {description}
        </Text>
      )}
    </Box>
  )
}

export default PageHeader
