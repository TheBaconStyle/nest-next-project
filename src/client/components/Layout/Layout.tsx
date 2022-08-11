import { Header } from '../Header/Header'

export function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}
