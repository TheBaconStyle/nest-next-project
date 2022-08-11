import Head from 'next/head'
import { Header } from 'src/client/components/Header/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>OSL: Главная</title>
      </Head>
      <Header />
    </>
  )
}
