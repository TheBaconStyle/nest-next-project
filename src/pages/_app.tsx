import { AppProps } from 'next/app'

import '../client/styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
