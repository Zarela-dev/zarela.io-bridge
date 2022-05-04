import { ReactNode } from 'react'
import { ThemeProvider } from '../Theme'
import Head from 'next/head'

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  )
}
