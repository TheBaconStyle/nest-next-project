import Head from 'next/head'
import { Layout } from 'src/client/components/Layout'
import { BasePageProps } from 'src/shared/types/page.type'
import { gssp } from 'src/shared/utils/gssp.util'

export const getServerSideProps = gssp

export default function Home({ user }: BasePageProps) {
  return (
    <Layout user={user}>
      <Head>
        <title>OSL: Главная</title>
      </Head>
      home
    </Layout>
  )
}
