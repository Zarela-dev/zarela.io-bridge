import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import CommonLayout from '../src/Layouts/CommonLayout'
// import { useEffect } from 'react'
// import TagManager from 'react-gtm-module'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'production')
  //     TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_CODE as string })
  // }, [])

  const getLayout = Component.getLayout ?? ((page) => page)
  return <CommonLayout>{getLayout(<Component {...pageProps} />)}</CommonLayout>
}

export default MyApp
