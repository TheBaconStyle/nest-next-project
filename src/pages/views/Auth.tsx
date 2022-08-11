import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Layout } from 'src/client/components/Layout/Layout'
import { createSignInSchema } from 'src/shared/schemas/signin.schema'
import { createSignUpSchema } from 'src/shared/schemas/signup.schema'
import { AuthPageProps } from 'src/shared/types/auth_page.types'
import { gssp } from 'src/shared/utils/gssp.util'

export const getServerSideProps = gssp

export default function AuthPage(props: AuthPageProps) {
  // const schema =
  //   props.type === 'register' ? createSignUpSchema() : createSignInSchema()
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ resolver: yupResolver(schema), defaultValues: {} })
  const submitHandler = (data) => console.log(data)
  return (
    <Layout>
      {props.type}
      <form>
        <button type="submit">Отправить</button>
      </form>
    </Layout>
  )
}
