import { GetServerSideProps } from 'next/types'
import { Header } from 'src/client/components/Header/Header'

export const getServerSideProps: GetServerSideProps = async (_context) => {
  return {
    props: {},
  }
}

export default function HomePage() {
  return (
    <>
      <Header></Header>
    </>
  )
}
