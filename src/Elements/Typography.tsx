import React from 'react'
import styled from 'styled-components'
import { Text as ThemeText } from 'rebass/styled-components'
import {
  variant,
  space,
  layout,
  color,
  compose,
  fontWeight,
  lineHeight,
  margin,
  textAlign,
  position,
  top,
  left,
  right,
  bottom,
} from 'styled-system'
import { ThemeInterface } from '../Theme'

const TextComponent = styled(ThemeText)(
  compose(space, layout, color, fontWeight, lineHeight, margin, textAlign, position, top, left, right, bottom),
  // #keep_watch https://github.com/styled-system/styled-system/issues/463
  // @ts-ignore
  {
    fontFamily: ['"Inter"'].join(','),
    // color: ({ theme }: { theme: ThemeInterface }): string => theme.colors.text.primary,
  },
  variant({
    prop: 'underlined',
    variants: {
      true: {
        backgroundImage: (theme: ThemeInterface) =>
          `linear-gradient(0deg, ${theme.colors.tertiary[800]} 0%, ${theme.colors.tertiary[800]} 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 16px',
        backgroundPosition: 'left bottom',
        transition: 'background-size 0.25s ease-in',
      },
    },
  }),
  variant({
    prop: 'variant',
    variants: {
      typography: {
        displayLarge: {
          fontSize: 'displayLarge', //this could be an array for different viewports
          fontWeight: 'bold', //this could be an array for different viewports
        },
        displayMedium: {
          fontSize: 'displayMedium', //or just one string to be the same size in any viewports
          fontWeight: 'medium', //or just one string to be the same size in any viewports
        },
        displaySmall: {
          fontSize: 'displaySmall',
          fontWeight: 'bold',
        },
        headlineLarge: {
          fontSize: 'headlineLarge',
          fontWeight: 'semiBold',
          display: 'inline',
        },
        headlineMedium: {
          fontSize: 'headlineMedium',
          fontWeight: 'semiBold',
          display: 'inline',
        },
        headlineSmall: {
          fontSize: 'headlineSmall',
          fontWeight: 'semiBold',
          display: 'inline',
        },
        titleLarge: {
          fontSize: 'titleLarge',
          fontWeight: 'medium',
        },
        titleMedium: {
          fontSize: 'titleMedium',
          fontWeight: 'semiBold',
        },
        titleSmall: {
          fontSize: 'titleSmall',
          fontWeight: 'medium',
        },
        labelLarge: {
          fontSize: 'labelLarge',
          fontWeight: 'semiBold',
        },
        labelMedium: {
          fontSize: 'labelMedium',
          fontWeight: 'semiBold',
        },
        labelSmall: {
          fontSize: 'labelSmall',
          fontWeight: 'semiBold',
        },
        bodyLarge: {
          fontSize: 'bodyLarge',
          fontWeight: 'regular',
        },
        bodyMedium: {
          fontSize: 'bodyMedium',
          fontWeight: 'regular',
        },
        bodySmall: {
          fontSize: 'bodySmall',
          fontWeight: 'regular',
        },
      },
    },
  })
)

// eslint-disable-next-line react/display-name
export const Text = React.forwardRef((props: any, _ref) => {
  return (
    <TextComponent
      color={props.color || 'text.primary'}
      ref={_ref}
      whiteSpace={props.whiteSpace || 'nowrap'}
      lineHeight="normal"
      {...props}
    ></TextComponent>
  )
})

export const StyledHeader = (props: any) => {}
// usage
// <Text variant="typography.labelSmall">hello world</Text>
