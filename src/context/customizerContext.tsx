
'use client'

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import config from './config'

// Types
interface CustomizerContextState {
  activeDir: string
  setActiveDir: (dir: string) => void
  activeMode: string
  setActiveMode: (mode: string) => void
  activeTheme: string
  setActiveTheme: (theme: string) => void
  activeLayout: string
  setActiveLayout: (layout: string) => void
  isCardShadow: boolean
  setIsCardShadow: (shadow: boolean) => void
  isLayout: string
  setIsLayout: (layout: string) => void
  isBorderRadius: number
  setIsBorderRadius: (radius: number) => void
  isCollapse: string
  setIsCollapse: (collapse: string) => void
  isSidebarHover: boolean
  setIsSidebarHover: (isHover: boolean) => void
  isMobileSidebar: boolean
  setIsMobileSidebar: (isMobileSidebar: boolean) => void
  isLanguage: string
  setIsLanguage: (lang: string) => void
}

// Helpers
const getStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : defaultValue
  } catch {
    return defaultValue
  }
}

const setStorage = <T,>(key: string, value: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// Context
export const CustomizerContext = createContext<CustomizerContextState | any>(undefined)


interface Props {
  children: ReactNode
}

export const CustomizerContextProvider: React.FC<Props> = ({ children }) => {
  const [isReady, setIsReady] = useState(false)

  const [activeDir, _setActiveDir] = useState(config.activeDir) // important 
  const [activeMode, _setActiveMode] = useState(config.activeMode) // important 
  const [activeTheme, _setActiveTheme] = useState(config.activeTheme)
  const [activeLayout, _setActiveLayout] = useState(config.activeLayout)
  const [isCardShadow, _setIsCardShadow] = useState(config.isCardShadow)
  const [isLayout, _setIsLayout] = useState(config.isLayout)
  const [isBorderRadius, _setIsBorderRadius] = useState(config.isBorderRadius)
  const [isCollapse, _setIsCollapse] = useState(config.isCollapse)
  const [isLanguage, _setIsLanguage] = useState(config.isLanguage) // important 
  const [isSidebarHover, setIsSidebarHover] = useState(false)
  const [isMobileSidebar, setIsMobileSidebar] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  // Load from localStorage on mount
  useEffect(() => {
    _setActiveDir(getStorage('activeDir', config.activeDir))
    _setActiveMode(getStorage('activeMode', config.activeMode))
    _setActiveTheme(getStorage('activeTheme', config.activeTheme))
    _setActiveLayout(getStorage('activeLayout', config.activeLayout))
    _setIsCardShadow(getStorage('isCardShadow', config.isCardShadow))
    _setIsLayout(getStorage('isLayout', config.isLayout))
    _setIsBorderRadius(getStorage('isBorderRadius', config.isBorderRadius))
    _setIsCollapse(getStorage('isCollapse', config.isCollapse))
    _setIsLanguage(getStorage('isLanguage', config.isLanguage))
    setIsReady(true)
  }, [])

  // Set attributes once ready
  useEffect(() => {
    if (!isReady) return
    document.documentElement.setAttribute('class', activeMode)
    document.documentElement.setAttribute('dir', activeDir)
    document.documentElement.setAttribute('data-color-theme', activeTheme)
    document.documentElement.setAttribute('data-layout', activeLayout)
    document.documentElement.setAttribute('data-boxed-layout', isLayout)
    document.documentElement.setAttribute('data-sidebar-type', isCollapse)
  }, [isReady, activeDir, activeMode, activeTheme, activeLayout, isLayout, isCollapse])

  // Setter wrappers that also save to localStorage
  const setActiveDir = (val: string) => {
    _setActiveDir(val)
    setStorage('activeDir', val)
  }
  const setActiveMode = (val: string) => {
    _setActiveMode(val)
    setStorage('activeMode', val)
  }
  const setActiveTheme = (val: string) => {
    _setActiveTheme(val)
    setStorage('activeTheme', val)
  }
  const setActiveLayout = (val: string) => {
    _setActiveLayout(val)
    setStorage('activeLayout', val)
  }
  const setIsCardShadow = (val: boolean) => {
    _setIsCardShadow(val)
    setStorage('isCardShadow', val)
  }
  const setIsLayout = (val: string) => {
    _setIsLayout(val)
    setStorage('isLayout', val)
  }
  const setIsBorderRadius = (val: number) => {
    _setIsBorderRadius(val)
    setStorage('isBorderRadius', val)
  }
  const setIsCollapse = (val: string) => {
    _setIsCollapse(val)
    setStorage('isCollapse', val)
  }
  const setIsLanguage = (val: string) => {
    _setIsLanguage(val)
    setStorage('isLanguage', val)
  }

  return (
    <CustomizerContext.Provider
      value={{
        activeDir,
        setActiveDir,
        activeMode,
        setActiveMode,
        activeTheme,
        setActiveTheme,
        activeLayout,
        setActiveLayout,
        isCardShadow,
        setIsCardShadow,
        isLayout,
        setIsLayout,
        isBorderRadius,
        setIsBorderRadius,
        isCollapse,
        setIsCollapse,
        isLanguage,
        setIsLanguage,
        isSidebarHover,
        setIsSidebarHover,
        isMobileSidebar,
        setIsMobileSidebar,

        isLightboxOpen,
        setIsLightboxOpen,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  )
}
