import { NextPageContext } from 'next'

import styles from '../styles/Qwe.module.scss'

interface PageProps {
  title: string
}
type PageContext = NextPageContext & {
  query: PageProps
}

export async function getServerSideProps(context: PageContext) {
  return {
    props: {
      title: context.query.title,
    },
  }
}

export default function HomePage({ title }: PageProps) {
  return <h1 className={styles.qwe}>{title}</h1>
}
