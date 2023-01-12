import { IconButton, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { FcCheckmark } from 'react-icons/fc'

type CopyButtonProps = {
  textToCopy: string
}

const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator?.clipboard?.writeText(textToCopy)
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, 5000)
    } catch (error) {
      console.log('handleCopy', error)
    }
  }

  return (
    <IconButton aria-label="Copy" color="gray.300" variant="unstyled" minW="unset" h="unset" padding={2} onClick={handleCopy}>
      <Tooltip
        label={isCopied ? 'Copied!' : 'Copy'}
        fontSize="sm"
        color="gray.50"
        textAlign="center"
        placement="right"
        hasArrow={true}
        arrowSize={8}
        closeDelay={1000}
        closeOnPointerDown={true}
        shouldWrapChildren={true}
      >
        {isCopied ? <FcCheckmark width={16} height={16} color="green" /> : <MdContentCopy width={16} height={16} />}
      </Tooltip>
    </IconButton>
  )
}

export default CopyButton
