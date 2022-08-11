import yup from 'yup'
export function createSignUpSchema() {
  const signUpSchema = yup
    .object({
      email: yup
        .string()
        .email('Введите действительный адрес электронной почты')
        .required('Адрес электронной почны не должен быть пустым'),
      login: yup
        .string()
        .min(6, 'Логин не может быть короче 6-и символов')
        .max(20, 'Логин не может быть длиннее 20-ти символов')
        .matches(
          /^\w+$/,
          'Логин не может включать в себя спецсимволы, пробелы и кириллические символы',
        )
        .required('Логин не может быть пустым'),
      password: yup
        .string()
        .min(8, 'Пароль не может быть короче 8-и символов')
        .matches(
          /^[\\\/\|\[\]\{\}^%$#@&~!?`'":;\.,*()\-\+=]+$/i,
          'Пароль должен включать в себя хотя бы один спецсимввол',
        )
        .matches(
          /^[A-Z]+$/,
          'Логин должен включать в себя хотя бы одну заглавную букву',
        )
        .matches(/^[0-9]+$/, 'Логин должен включать в себя хотя бы одну цифру')
        .required('Пароль не может быть пустым'),
      confirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
    })
    .required()
  return signUpSchema
}