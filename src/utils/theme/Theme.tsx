import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { DarkThemeColors } from './DarkThemeColors'
import { LightThemeColors } from './LightThemeColors'
import { CustomizerContext } from '@/context/customizerContext'
import { baseDarkTheme, baselightTheme } from './DefaultColors'
import { darkshadows, shadows } from './Shadows'
import typography from './Typography'
import { createTheme } from '@mui/material'
import components from './Components'
import * as locales from '@mui/material/locale'

export const BuildTheme = (config: any = {}) => {
  const themeOptions = LightThemeColors.find(
    (theme) => theme.name === config.theme
  )
  const darkThemeOptions = DarkThemeColors.find(
    (theme) => theme.name === config.theme
  )
  const { activeMode, isBorderRadius } = useContext(CustomizerContext)
  const defaultTheme = activeMode === 'dark' ? baseDarkTheme : baselightTheme
  const defaultShadow = activeMode === 'dark' ? darkshadows : shadows
  const themeSelect = activeMode === 'dark' ? darkThemeOptions : themeOptions
  const baseMode = {
    palette: {
      mode: activeMode,
    },
    shape: {
      borderRadius: isBorderRadius,
    },
    shadows: defaultShadow,
    typography: typography,
  }

  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    })
  )
  theme.components = components(theme)

  return theme
}

const ThemeSettings = () => {
  const { activeDir, activeTheme } = useContext(CustomizerContext)

  const theme = BuildTheme({
    direction: activeDir,
    theme: activeTheme,
  })
  useEffect(() => {
    document.dir = activeDir
  }, [activeDir])

  return theme
}

export { ThemeSettings }
