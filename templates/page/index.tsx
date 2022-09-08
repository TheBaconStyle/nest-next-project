import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Layout } from 'src/client/components/Layout'
import { BasePageProps } from 'src/shared/types/page.type'
import { gssp } from 'src/shared/utils/gssp.util'
import styles from './page.module.scss'

export const getServerSideProps: GetServerSideProps = gssp

export interface TemplateNamePageProps extends BasePageProps {}

export default function TemplateNamePage({}: TemplateNamePageProps) {
  return (
    <Layout>
      <Head>
        <title>TemplateName page</title>
      </Head>
      <div className={styles.templateNamePage}>TemplateName page</div>
    </Layout>
  )
}
