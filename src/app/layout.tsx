import React from 'react'
import MyApp from './app'
import './globals.css'
import NextTopLoader from 'nextjs-toploader';
import { CustomizerContextProvider } from '../context/customizerContext'
import AuthContextProvider from '@/context/authContext'
import AdminAuthContextProvider from '@/context/adminAuthContext'


export const metadata = {
  title: 'Alluvo',
  description: 'All Of Your Favorite',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CustomizerContextProvider>
          <AuthContextProvider>
            <AdminAuthContextProvider>
              <NextTopLoader color="#001170" />
              <MyApp>{children}</MyApp>
            </AdminAuthContextProvider>
          </AuthContextProvider>
        </CustomizerContextProvider>
      </body>
    </html>
  )
}
