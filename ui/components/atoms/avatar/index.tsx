import React, { useRef } from 'react'

// Dependencies
import { Box } from '@chakra-ui/react'

type AvatarProps = {
  variant: 'header' | 'drawer'
}

const Avatar = ({ variant }: AvatarProps) => {
  const avatarRef = useRef<HTMLDivElement>(null)

  // const handleAvatar = useCallback(() => {
  //     if (avatar && avatarRef?.current) {
  //         if (avatarRef.current.firstChild) {
  //             avatarRef.current.removeChild(avatarRef.current.firstChild)
  //         }

  //         avatarRef.current.appendChild(avatar)
  //     }
  // }, [avatar, avatarRef])

  // useEffect(() => {
  //     handleAvatar()
  // }, [handleAvatar])

  const isDrawer = variant === 'drawer'

  return (
    <Box
      borderRadius="full"
      p={0}
      width={10}
      display="inline-block"
      backgroundColor="rgb(24, 151, 242)"
      overflow="hidden"
      id="avatar"
      height={10}
      ref={avatarRef}
      mr={isDrawer ? 2 : 0}
      // dangerouslySetInnerHTML={{ __html: avatar?.innerHTML || '' }}
    />
  )
}

export default Avatar

// TODO: refact wallet avatar
