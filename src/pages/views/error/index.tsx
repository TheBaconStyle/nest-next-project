import Error from 'next/error'
import {gssp} from 'src/shared/utils/gssp.util'

export const getServerSideProps = gssp

export interface ErrorPageProps {
  status: number
  message: string
}

export default function ErrorPage({status, message}: ErrorPageProps) {
  return (
    <>
      <Error statusCode={status} title={message}/>
    </>
  )
}
