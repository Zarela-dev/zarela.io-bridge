import React from 'react'
import styled from 'styled-components'
import { Box } from 'rebass/styled-components'
import {
  variant,
  space,
  layout,
  color,
  width,
  padding,
  compose,
  backgroundColor,
  borderColor,
  borderStyle,
  borderWidth,
} from 'styled-system'
import { ThemeInterface } from '../Theme'

const CardComponent = styled(Box)(
  compose(space, layout, color, borderColor, borderStyle, borderWidth, backgroundColor, width, padding),
  // #keep_watch https://github.com/styled-system/styled-system/issues/463
  // @ts-ignore
  {
    // borderStyle: 'solid',
    // borderWidth: ['1px'],
    // borderColor: ({ theme }: { theme: ThemeInterface }) => theme.colors.other.border,
  },
  variant({
    prop: 'contained',
    variants: {
      true: {
        maxWidth: 320,
        width: '100%',
      },
    },
  }),
  variant({
    prop: 'variant',
    variants: {
      card: {
        primary: {
          borderRadius: [4],
          backgroundColor: 'background.default',
        },
        secondary: {
          borderRadius: [4],
          backgroundColor: 'background.surface',
        },
        other: {
          borderRadius: [4],
          backgroundColor: 'background.other',
        },
      },
    },
  })
)

// eslint-disable-next-line react/display-name
export const Card = React.forwardRef((props: any, _ref) => {
  return (
    <CardComponent
      borderWidth={props.borderWidth || '1px'}
      padding={props.padding || [5]}
      ref={_ref}
      {...props}
    ></CardComponent>
  )
})

//usage
{
  /* <Card variant="card.primary"><Text variant="typography.displayLarge" as="h1">hello world</Text></Card> */
}
