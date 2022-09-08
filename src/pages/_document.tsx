import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href="/public/assets/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
