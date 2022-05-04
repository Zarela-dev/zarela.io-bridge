import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button as RebassButton, SxStyleProp } from 'rebass/styled-components'
import {
  variant,
  space,
  layout,
  color,
  compose,
  fontWeight,
  lineHeight,
  fontSize,
  borderRadius,
  borderColor,
} from 'styled-system'
import { ThemeInterface } from '../Theme'
import { Link } from './Link'

const ButtonComponent = styled(RebassButton)(
  compose(space, layout, color, borderColor, fontWeight, lineHeight, fontSize, borderRadius),
  // #keep_watch https://github.com/styled-system/styled-system/issues/463
  // @ts-ignore
  {
    fontFamily: ['"Inter"'].join(','),
    borderRadius: ({ theme }: { theme: ThemeInterface }): string => theme.radii[2] + 'px',
    fontWeight: ({ theme }: { theme: ThemeInterface }): number => theme.fontWeights.semiBold,
    textAlign: 'center',
    cursor: 'pointer',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    '-ms-touch-action': 'manipulation !important',
    'touch-action': 'manipulation !important',
    transform: 'scale(1)',
    '-webkit-transition':
      'box-shadow 0.2s ease-out, -webkit-transform 0.2s ease-out, transform 0.2s ease-out !important',
    '-moz-transition': 'box-shadow 0.2s ease-out, transform 0.2s ease-out !important',
    transition:
      'box-shadow 0.2s ease-out, -ms-transform 0.2s ease-out, -webkit-transform 0.2s ease-out, transform 0.2s ease-out !important',
    '-webkit-tap-highlight-color': 'transparent !important',

    '&:active': {
      '-webkit-transform': 'scale(0.94) !important',
      '-ms-transform': 'scale(0.94) !important',
      transform: 'scale(0.94) !important',
    },
  },
  variant({
    prop: 'variant',
    variants: {
      primary: {
        backgroundColor: 'tertiary.800',
        '&:hover': {
          backgroundColor: 'tertiary.900',
        },
        '&:focused': {
          backgroundColor: 'tertiary.900',
        },
        '&:active': {
          backgroundColor: 'tertiary.900',
        },
        '&:disabled': {
          cursor: 'not-allowed',
          backgroundColor: 'tertiary.800',
          opacity: 0.75,
        },
      },
      secondary: {
        backgroundColor: 'darkTheme.600',
        '&:hover': {
          backgroundColor: 'darkTheme.700',
        },
        '&:focused': {
          backgroundColor: 'darkTheme.700',
        },
        '&:active': {
          backgroundColor: 'darkTheme.700',
        },
        '&:disabled': {
          cursor: 'not-allowed',
          backgroundColor: 'darkTheme.600',
          opacity: 0.5,
        },
      },
      success: {
        backgroundColor: 'success.main',
        '&:hover': {
          backgroundColor: 'success.dark',
        },
        '&:focused': {
          backgroundColor: 'success.dark',
        },
        '&:active': {
          backgroundColor: 'success.dark',
        },
        '&:disabled': {
          cursor: 'not-allowed',
          backgroundColor: 'success.light',
          opacity: 0.5,
        },
      },
      danger: {
        backgroundColor: 'darkTheme.600',
        borderColor: 'danger.main',
        borderWidth: '1px',
        borderStyle: 'solid',
        '&:hover': {
          backgroundColor: 'danger.dark',
        },
        '&:focused': {
          backgroundColor: 'danger.dark',
        },
        '&:active': {
          backgroundColor: 'danger.dark',
        },
        '&:disabled': {
          cursor: 'not-allowed',
          backgroundColor: 'danger.light',
          opacity: 0.5,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: 'other.border',
        borderWidth: '1px',
        borderStyle: 'solid',
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.5,
        },
      },
      checkbox: (props: any): any => ({
        backgroundColor: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&:focused': {
          backgroundColor: 'success.dark',
        },
      }),
      text: {
        backgroundColor: 'transparent',
        border: 'none',
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.5,
        },
      },
      link: {
        backgroundColor: 'transparent',
        border: 'none',
        textDecoration: 'underline',
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.5,
        },
      },
    },
  }),
  variant({
    prop: 'size',
    variants: {
      small: {
        height: '32px',
        fontSize: 'labelSmall',
        padding: 2,
      },
      medium: {
        height: '40px',
        fontSize: 'labelMedium',
        padding: 3,
      },
      large: {
        height: '48px',
        fontSize: 'labelMedium',
        padding: 4,
      },
    },
  })
)

// eslint-disable-next-line react/display-name
export const Button = (props: any) => {
  if (props.href !== undefined)
    return (
      <Link href={props.href} target={props.target} rel={props.href} isMagnetic>
        <ButtonComponent {...props}>{props.children}</ButtonComponent>
      </Link>
    )

  return (
    <ButtonComponent {...props}>
      {props.icon}
      {props.children}
    </ButtonComponent>
  )
}

//  <Button variant="primary|secondary|outline|text|link" disabled size={'small|medium|large'} href="https://">
// 		button here
// 	</Button>
