import { NextPageContext } from 'next'

interface PageProps {
  message: string
}
type PageContext = NextPageContext & {
  query: PageProps
}

export async function getServerSideProps(context: PageContext) {
  return {
    props: {
      message: context.query.message,
    },
  }
}
export default function Err401({ message }: PageProps) {
  return <>Error 401,{message}</>
}
