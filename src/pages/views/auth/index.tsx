import { Layout } from 'src/client/components/Layout'
import { SignUpForm } from 'src/client/components/SignUpForm'
import { SignInForm } from 'src/client/components/SignInForm'
import { AuthPageProps } from 'src/shared/types/auth.types'
import { gssp } from 'src/shared/utils/gssp.util'

export const getServerSideProps = gssp

export default function AuthPage(props: AuthPageProps) {
  return (
    <Layout>
      <div
        style={{
          flex: 1,
          display: 'flex',
        }}
      >
        {props.type === 'register' && <SignUpForm />}
        {props.type === 'auth' && <SignInForm />}
      </div>
    </Layout>
  )
}
