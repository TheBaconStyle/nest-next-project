import { GetServerSideProps } from 'next'

export const gssp: GetServerSideProps = async ({ query: props }) => {
  return { props }
}
