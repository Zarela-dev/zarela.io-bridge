import React from 'react'
import Image from 'next/image'
import { Box, SxStyleProp } from 'rebass/styled-components'

const WrappedImage = ({ sx, src, alt }: { sx?: SxStyleProp; src: StaticImageData; alt: string }) => {
  return (
    <Box sx={sx}>
      <Image src={src} alt={alt} />
    </Box>
  )
}

export default WrappedImage
