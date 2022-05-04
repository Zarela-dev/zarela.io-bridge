import React from 'react'
import styled from 'styled-components'
import { variant, space, layout, compose } from 'styled-system'
import { Box } from 'rebass/styled-components'
import Image from 'next/image'

const IconComponent = styled(Box)(
  compose(space, layout),
  {
    cursor: 'pointer',
  },
  variant({
    prop: 'variant',
    variants: {
      large: {
        height: [32],
        width: [32],
      },
      medium: {
        height: [24],
        width: [24],
      },
      small: {
        height: [16],
        width: [16],
      },
    },
  })
)

// eslint-disable-next-line react/display-name
export const Icon = React.forwardRef((props: any, _ref) => {
  const getImageSizes = (variant: 'small' | 'medium' | 'large' | 'extraLarge') => {
    switch (variant) {
      case 'small':
        return {
          width: 16,
          height: 16,
        }
      case 'medium':
        return {
          width: 24,
          height: 24,
        }
      case 'large':
        return {
          width: 32,
          height: 32,
        }
      case 'extraLarge':
        return {
          width: 42,
          height: 42,
        }
      default:
        return {
          width: 24,
          height: 24,
        }
    }
  }
  return (
    <IconComponent ref={_ref} {...props}>
      <Image
        src={props.src}
        alt={props.alt}
        layout="fixed"
        {...{ width: getImageSizes(props.variant).width, height: getImageSizes(props.variant).height }}
      />
    </IconComponent>
  )
})

//usage
{
  /* <Icon src='/images/social/twitter.svg' alt="twitter" variant="normal" />*/
}
