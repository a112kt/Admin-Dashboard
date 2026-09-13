'use client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import React, { useContext, useState } from 'react'
import { CustomizerContext } from '@/context/customizerContext'
import { ThemeSettings } from '@/utils/theme/Theme'
import '@/utils/i18n'
import RTL from '../components/layout/shared/customizer/RTL'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const MyApp = ({ children }: { children: React.ReactNode }) => {
  const theme = ThemeSettings()
  const { activeDir } = useContext(CustomizerContext)
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>

      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <RTL direction={activeDir}>
            <QueryClientProvider client={queryClient}>
              <CssBaseline />
              {children}
            </QueryClientProvider>
          </RTL>
        </ThemeProvider>
      </AppRouterCacheProvider>


    </>
  )
}

export default MyApp
