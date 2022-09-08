import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (_context) => {
  return { props: {}, redirect: { destination: '/auth/signin' } }
}

export default function Err401() {
  return <>Unauthorized</>
}
