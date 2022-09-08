import Head from 'next/head'
import { CategoriesFilter } from 'src/client/components/CategoriesFilter'
import { Layout } from 'src/client/components/Layout'
import { BasePageProps } from 'src/shared/types/page.type'
import { gssp } from 'src/shared/utils/gssp.util'

export interface HomePageProps extends BasePageProps {}

export const getServerSideProps = gssp

export default function Home({ user }: HomePageProps) {
  return (
    <Layout>
      <Head>
        <title>OSL: Типы оборудования</title>
      </Head>
      <CategoriesFilter />
    </Layout>
  )
}
