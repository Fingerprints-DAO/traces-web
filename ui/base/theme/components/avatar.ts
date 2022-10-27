// Dependencies
import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys)

const Avatar = defineMultiStyleConfig({
  sizes: {
    xm: definePartsStyle({
      container: defineStyle({
        width: '40px',
        height: '40px',
        fontSize: '6xl',
      }),
    }),
  },
})

export default Avatar
