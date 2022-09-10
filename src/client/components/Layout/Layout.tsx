import { ReactNode } from 'react'
import { BasePageProps } from 'src/shared/types/page.type'
import { Header } from '../Header'

export interface LayoutProps extends BasePageProps {
  children: ReactNode
}

export function Layout({ children, user }: LayoutProps) {
  return (
    <>
      <Header user={user} />
      {children}
    </>
  )
}
