import React, { ReactNode } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { ThemeInterface } from './theme'
import GlobalStyle from './_reset'

export type { ThemeInterface } from './theme'
export const breakpoints = ['425px', '1024px', '1440px']
const DarkTheme: ThemeInterface = {
  fonts: {
    primary: 'Inter',
    secondary: 'Inter',
    fallback: 'Tahoma, Sans-Serif',
  },
  fontSizes: {
    displayLarge: '4rem',
    displayMedium: '3.5rem',
    displaySmall: '3rem',
    headlineLarge: '2.5rem',
    headlineMedium: '2rem',
    headlineSmall: '1.5rem',
    titleLarge: '1.375rem',
    titleMedium: '1.125rem',
    titleSmall: '1rem',
    labelLarge: '1rem',
    labelMedium: '0.875rem',
    labelSmall: '0.75rem',
    bodyLarge: '1.125rem',
    bodyMedium: '1rem',
    bodySmall: '0.875rem',
  },
  lineHeights: {
    normal: 1.2,
  },
  breakpoints,
  radii: [0, 4, 8, 12, 16, 24],
  zIndices: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  fontWeights: {
    bold: 600,
    medium: 500,
    semiBold: 400,
    regular: 300,
    light: 200,
  },
  container: '800px',
  space: [0, 4, 8, 12, 16, 24, 32, 64],
  shadows: {
    level1: '0px 2px 6px 2px rgba(0, 0, 0, 0.2)',
    level2: '0px 4px 14px 6px rgba(0, 0, 0, 0.2)',
    level3: '0px 8px 24px 12px rgba(0, 0, 0, 0.2)',
  },
  colors: {
    mode: 'dark',
    primary: {
      main: '#5C309A',
      100: '#E8E1F4',
      200: '#E1D4FB',
      300: '#C9AFFE',
      400: '#A883E0',
      500: '#8A51E0',
      600: '#5C309A',
      700: '#482570',
      800: '#36175A',
      900: '#70697A',
    },
    secondary: {
      main: '#00D9E1',
      100: '#FAFCFC',
      200: '#DFF1F2',
      300: '#B7E9EB',
      400: '#92E9EC',
      500: '#54E9EF',
      600: '#1FEEF5',
      700: '#00D9E1',
      800: '#01B9C0',
      900: '#008388',
    },
    tertiary: {
      main: '#E63E99',
      100: '#FBE1F2',
      200: '#F0CCE0',
      300: '#EAA2C9',
      400: '#E870B1',
      500: '#E63E99',
      600: '#D3368B',
      700: '#AA3172',
      800: '#972A55',
      900: '#88244C',
    },
    warning: {
      main: '#F8AF1A',
      light: '#FFE8B8',
      dark: '#D78C1B',
    },
    danger: {
      main: '#FF6846',
      light: '#FFB5A4', //FFB5A41F  for Disclaimer Hubs page
      dark: '#E74A26',
    },
    success: {
      main: '#34C889',
      light: '#B3EED5',
      dark: '#13A768',
    },
    info: {
      main: '#57D1EC',
      light: '#A6EBFA',
      dark: '#2CA7C2',
    },
    background: {
      default: '#181120',
      surface: '#332C3F',
      other: '#514A5C',
    },
    content: {
      500: '#847D8E',
      600: '#AAA3B3',
      700: '#CCC9D1',
      800: '#ECEBED',
      900: '#FFFFFF',
    },
    other: {
      border: '#70697A',
      icon: '#ECEBED',
      disabled: '#453D51',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCC9D1',
      disabled: '#453D51',
    },
    darkTheme: {
      10: '#FFFFFF',
      100: '#ECEBED',
      200: '#CCC9D1',
      300: '#AAA3B3',
      400: '#847D8E',
      500: '#70697A',
      600: '#514A5C',
      700: '#453D51',
      800: '#332C3F',
      900: '#181120',
    },
  },
  components: {},
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledComponentsThemeProvider theme={DarkTheme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </StyledComponentsThemeProvider>
  )
}
