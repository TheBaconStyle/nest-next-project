import { Header } from '../Header'

export function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}
