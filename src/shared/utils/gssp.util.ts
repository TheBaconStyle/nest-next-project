import { GetServerSideProps, GetServerSidePropsResult } from 'next'

export const gssp: GetServerSideProps = async <T>(
  context,
): Promise<GetServerSidePropsResult<T>> => {
  const { query: props } = context
  return { props }
}
