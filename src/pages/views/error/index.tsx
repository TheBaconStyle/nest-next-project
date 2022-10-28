import Error from 'next/error'
import {gssp} from 'src/shared/utils/gssp.util'
import {Header} from "../../../client/components/Header";

export interface ErrorPageProps {
  status: number
  message: string
}

export const getServerSideProps = gssp

export default function ErrorPage({status, message}: ErrorPageProps) {
  return <><Header/><Error statusCode={status} title={message}/></>
}
