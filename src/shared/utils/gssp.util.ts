import { GetServerSideProps } from 'next'

export const gssp: GetServerSideProps = async (context) => {
  const { query: props } = context
  return { props }
}
