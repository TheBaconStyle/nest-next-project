import * as yup from 'yup'

export const SignInSchema = yup
  .object({
    login: yup.string().required(),
    password: yup.string().required(),
  })
  .required()
