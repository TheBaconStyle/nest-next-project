import { Header } from 'src/client/components/Header/Header'
import { gssp } from 'src/shared/utils/gssp.util'

export const getServerSideProps = gssp

export default function Account(props) {
  return (
    <>
      <Header />
      {props.user}
    </>
  )
}
