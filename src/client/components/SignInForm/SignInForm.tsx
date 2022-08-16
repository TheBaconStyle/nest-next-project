import * as yup from 'yup'
import { SignInSchema } from 'src/shared/schema/signin.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { ApiClient } from 'src/shared/utils/api-client.util'
import styles from '../../styles/form.module.scss'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

type SignInFields = yup.InferType<typeof SignInSchema>

export function SignInForm() {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<SignInFields>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(SignInSchema),
  })
  const [userAgent, setUserAgent] = useState<string>()
  useEffect(() => {
    setUserAgent(window.navigator.userAgent)
  }, [])
  const router = useRouter()
  const submitHandler = useCallback(
    async (data: SignInFields) => {
      try {
        await ApiClient.get('/auth/', {
          headers: { 'User-Agent': userAgent },
        })
        router.push('/')
      } catch (e) {
        console.log(e)
      }
    },
    [userAgent],
  )
  return (
    <form
      onSubmit={handleSubmit(submitHandler, console.log)}
      className={styles.form}
    >
      <div className={styles.form_title}>Аутентификация</div>

      <div>
        <input
          type="text"
          {...register('login')}
          className={styles.form_group_input}
          placeholder="Логин"
        />
      </div>
      <div>
        <input
          type="password"
          {...register('password')}
          className={styles.form_group_input}
          placeholder="Пароль"
        />
      </div>
      <button type="submit" className={styles.form_submit}>
        <AiOutlineUserAdd />
        Войти
      </button>
    </form>
  )
}
