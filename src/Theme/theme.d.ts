type Color = string
type FontSize = string
type FontWeight = number

type ColorExtension = {
  main: Color
  100: Color
  200: Color
  300: Color
  400: Color
  500: Color
  600: Color
  700: Color
  800: Color
  900: Color
}

export interface ThemeInterface {
	fonts: {
		primary: string
		secondary: string
		fallback: string
	}
  fontSizes: {
    displayLarge: FontSize
    displayMedium: FontSize
    displaySmall: FontSize
    headlineLarge: FontSize
    headlineMedium: FontSize
    headlineSmall: FontSize
    titleLarge: FontSize
    titleMedium: FontSize
    titleSmall: FontSize
    labelLarge: FontSize
    labelMedium: FontSize
    labelSmall: FontSize
    bodyLarge: FontSize
    bodyMedium: FontSize
    bodySmall: FontSize
  }
  lineHeights: {
    normal: number
  }
  breakpoints: string[]
	zIndices: number[]
  radii: number[]
  fontWeights: {
    bold: FontWeight
    medium: FontWeight
    semiBold: FontWeight
    regular: FontWeight
    light: FontWeight
  }
	container: string
  space: number[]
	shadows: {
		level1: string
		level2: string
		level3: string
	}
  colors: {
    mode: Color
    primary: ColorExtension
    secondary: ColorExtension
    tertiary: ColorExtension
    warning: {
      main: Color
      light: Color
      dark: Color
    }
    danger: {
      main: Color
      light: Color
      dark: Color
    }
    success: {
      main: Color
      light: Color
      dark: Color
    }
    info: {
      main: Color
      light: Color
      dark: Color
    }
    background: {
      default: Color
      surface: Color
      other: Color
    }
    content: {
      500: Color
      600: Color
      700: Color
      800: Color
      900: Color
    }
    other: {
      border: Color
      icon: Color
      disabled: Color
    }
    darkTheme: {
      10: Color
      100: Color
      200: Color
      300: Color
      400: Color
      500: Color
      600: Color
      700: Color
      800: Color
      900: Color
    }
    text: {
      primary: Color
      secondary: Color
      disabled: Color
    }
  }
  components: any
}
