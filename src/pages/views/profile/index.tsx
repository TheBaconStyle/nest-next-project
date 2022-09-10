import Head from 'next/head'
import { Layout } from 'src/client/components/Layout'
import { BasePageProps } from 'src/shared/types/page.type'
import { gssp } from 'src/shared/utils/gssp.util'

export const getServerSideProps = gssp

export default function Account({ user }: BasePageProps) {
  return (
    <Layout user={user}>
      <Head>
        <title>OSL: Профиль</title>
      </Head>
      profile
    </Layout>
  )
}
