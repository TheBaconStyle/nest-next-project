import yup from 'yup'

export function createSignInSchema() {
  const signInSchema = yup.object({
    login: yup.string().required(),
    password: yup.string().required(),
  })
  return signInSchema
}
