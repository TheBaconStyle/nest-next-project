import Head from 'next/head'
import { Header } from 'src/client/components/Header'
import styles from './templatename.module.scss'

export interface TemplateNamePageProps {}

export default function TemplateNamePage({}: TemplateNamePageProps) {
  return (
    <>
      <Header items={[]} />
      <Head>
        <title>TemplateName page</title>
      </Head>
      <div className={styles.templateNamePage}>TemplateName page</div>
    </>
  )
}
