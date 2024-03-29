import React from 'react'

// Dependencies
import { Box, Tooltip } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { RiFileTextLine, RiGithubLine, RiTwitterLine } from 'react-icons/ri'

const Medias = () => {
  return (
    <Box as="nav" display="flex" alignItems="center">
      <Box as="a" href={process.env.NEXT_PUBLIC_TWITTER_URL} target="_blank" marginRight={4}>
        <Icon as={RiTwitterLine} boxSize="24px" color="gray.100" display="block" />
      </Box>
      <Box as="a" href={process.env.NEXT_PUBLIC_DISCORD_URL} target="_blank" marginRight={4}>
        <Icon fill="none" viewBox="0 0 24 24" boxSize="24px" color="gray.100" display="block">
          <path
            d="M8.236 3.389a1.992 1.992 0 0 0-.95.119c-.92.351-2.118.9-3.165 1.746l-.027.021-.026.022c-.464.43-.72.947-1.045 1.654a20.39 20.39 0 0 0-.95 2.563C1.476 11.479 1 13.87 1 16.164c0 .24.063.49.188.71.806 1.422 2.2 2.215 3.44 2.69 1.232.472 2.276.632 2.872.653.02 0 .069.008.07.008.408 0 .937-.15 1.235-.713l.922-1.744c1.526.267 2.971.263 4.539-.016l.927 1.756c.299.569.833.715 1.237.715l.064-.006c.596-.02 1.643-.182 2.877-.654 1.24-.475 2.631-1.266 3.438-2.686a1.44 1.44 0 0 0 .191-.713c0-2.294-.478-4.686-1.076-6.654a20.28 20.28 0 0 0-.957-2.57c-.329-.71-.594-1.232-1.059-1.663l-.025-.021-.026-.022c-1.035-.837-2.228-1.38-3.144-1.728a2 2 0 0 0-1.846.223c-.418.287-.56.785-.67 1.271H9.803c-.11-.485-.251-.984-.668-1.271a2 2 0 0 0-.899-.34ZM8 5.375A1.64 1.64 0 0 0 9.625 7h4.748c.885 0 1.626-.74 1.627-1.625h.002c.786.3 1.794.783 2.56 1.393.018.022.316.422.588 1.011.28.603.584 1.406.86 2.313.536 1.763.939 3.934.963 5.9-.482.751-1.37 1.34-2.317 1.703a7.506 7.506 0 0 1-1.92.452l-.463-.877c.344-.101.685-.2 1.047-.323a1 1 0 1 0-.64-1.894c-3.83 1.295-5.715 1.296-9.346.006a1 1 0 1 0-.668 1.883c.364.129.71.234 1.055.34l-.457.865a7.513 7.513 0 0 1-1.92-.452c-.947-.362-1.834-.95-2.317-1.7.024-1.967.425-4.139.96-5.901.274-.907.577-1.707.853-2.307.27-.586.567-.986.576-1 .78-.62 1.795-1.11 2.584-1.412Zm1.04 4.621c-.83 0-1.5.893-1.5 1.996s.67 1.996 1.5 1.996c.828 0 1.5-.893 1.5-1.996-.019-1.103-.669-2.106-1.5-1.996Zm5.956.016c-.398 0-.78.21-1.06.586-.282.375-.44.883-.44 1.414 0 .53.158 1.039.44 1.414.28.375.662.586 1.06.586s.78-.21 1.06-.586c.282-.375.44-.884.44-1.414 0-.53-.158-1.04-.44-1.414-.28-.376-.662-.586-1.06-.586Z"
            fill="currentColor"
          />
        </Icon>
      </Box>
      <Tooltip label={'Check out the code on Github'} fontSize="sm" color="gray.50" textAlign="center" placement="auto" hasArrow={true} arrowSize={8}>
        <Box as="a" href={'https://github.com/Fingerprints-DAO/traces-contracts'} target="_blank" marginRight={4}>
          <Icon as={RiGithubLine} boxSize="24px" color="gray.100" display="block" />
        </Box>
      </Tooltip>

      <Tooltip
        label={'Check out the contract on Etherscan'}
        fontSize="sm"
        color="gray.50"
        textAlign="center"
        placement="auto"
        hasArrow={true}
        arrowSize={8}
      >
        <Box
          as="a"
          href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}/address/${process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS}`}
          target="_blank"
          marginRight={4}
        >
          <Icon as={RiFileTextLine} boxSize="24px" color="gray.100" display="block" />
        </Box>
      </Tooltip>
    </Box>
  )
}

export default Medias
