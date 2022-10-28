import {yupResolver} from '@hookform/resolvers/yup'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {SignUpSchema} from 'src/shared/schema/signup.schema'
import {ApiClient} from 'src/shared/utils/api-client.util'
import * as yup from 'yup'
import styles from '../../styles/AuthForm.module.scss'

type SignUpFields = yup.InferType<typeof SignUpSchema>

export function SignUpForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpFields>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(SignUpSchema),
  })

  async function submitHandler(formData: SignUpFields) {
    try {
      const {login, email, password} = formData
      await ApiClient.post('/api/auth/signup', {login, email, password})
      await router.push('/signin')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler, console.log)}
      className={styles.form}
    >
      <div className={styles.form_title}>Регистрация</div>
      <div>
        <input
          type="email"
          {...register('email')}
          className={styles.form_group_input}
          placeholder="E-mail"
        />
        <div>{errors.email ? errors.email.message : 'undefined'}</div>
      </div>
      <div>
        <input
          type="text"
          {...register('login')}
          className={styles.form_group_input}
          placeholder="Логин"
        />
        <div>{errors.login ? errors.login.message : 'undefined'}</div>
      </div>
      <div>
        <input
          type="password"
          {...register('password')}
          className={styles.form_group_input}
          placeholder="Пароль"
        />
        <div>{errors.password ? errors.password.message : 'undefined'}</div>
      </div>
      <div>
        <input
          type="password"
          {...register('confirmation')}
          className={styles.form_group_input}
          placeholder="Повторите пароль"
        />
        <div>{errors.confirmation ? errors.confirmation.message : 'undefined'}</div>
      </div>
      <button type="submit" className={styles.form_submit}>
        <AiOutlineUserAdd/>
        Зарегистрироваться
      </button>
    </form>
  )
}
