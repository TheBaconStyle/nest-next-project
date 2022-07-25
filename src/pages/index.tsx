import dayjs from 'dayjs'
import { GetServerSideProps } from 'next/types'

interface PageProps {
  qwe: string
  ewq: string
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  _context,
) => {
  const qwe = dayjs().startOf('hour').toDate().toLocaleString()
  const ewq = dayjs().add(1, 'month').startOf('hour').toDate().toString()
  return {
    props: { qwe, ewq },
  }
}

export default function HomePage(props: PageProps) {
  return (
    <>
      <h1 className="bg-green-500">{props.qwe}</h1>
      10:00 <br />
      11:00 <br />
      12:00 <br />
      13:00 <br />
      14:00 <br />
      <h1 className="bg-green-500">{props.ewq}</h1>
    </>
  )
}
