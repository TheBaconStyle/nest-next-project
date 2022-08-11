import { AppProps } from 'next/app'
import React from 'react'

import '../client/styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
