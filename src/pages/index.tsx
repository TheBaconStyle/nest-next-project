import dayjs from 'dayjs'
import { NextPageContext, GetServerSideProps } from 'next/types'

interface PageProps {
  qwe: string
  ewq: string
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context,
) => {
  const qwe = dayjs().startOf('hour').toDate().toISOString()
  const ewq = dayjs().add(30, 'days').startOf('hour').toDate().toString()
  return {
    props: { qwe, ewq },
  }
}

export default function HomePage(props: PageProps) {
  return (
    <>
      <h1 className="bg-green-500">{props.qwe}</h1>
      <h1 className="bg-green-500">{props.ewq}</h1>
    </>
  )
}
