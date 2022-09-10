import Head from 'next/head'
import { CategoriesFilter } from 'src/client/components/CategoriesFilter'
import { Layout } from 'src/client/components/Layout'
import { Category } from 'src/server/entities'
import { BasePageProps } from 'src/shared/types/page.type'
import { gssp } from 'src/shared/utils/gssp.util'

export interface HomePageProps extends BasePageProps {
  categories: string
}

export const getServerSideProps = gssp

export default function Categories({ user, categories }: HomePageProps) {
  const unpackaged = JSON.parse(categories) as Category[]
  return (
    <Layout user={user}>
      <Head>
        <title>OSL: Типы оборудования</title>
      </Head>
      <CategoriesFilter categories={unpackaged} />
    </Layout>
  )
}
