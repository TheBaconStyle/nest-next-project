import * as yup from 'yup'
export const SignUpSchema = yup
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
        /^\w+$/g,
        'Логин не может включать в себя спецсимволы, пробелы и кириллические символы',
      )
      .required('Логин не может быть пустым'),
    password: yup
      .string()
      .min(8, 'Пароль не может быть короче 8-и символов')
      .matches(
        /[\\\/\|\[\]\{\}^%$#@&~!?`'":;\.,*()\-\+=]+/gi,
        'Пароль должен включать в себя хотя бы один спецсимввол',
      )
      .matches(
        /[A-Z]+/g,
        'Пароль должен включать в себя хотя бы одну заглавную букву',
      )
      .matches(/[0-9]+/g, 'Пароль должен включать в себя хотя бы одну цифру')
      .required('Пароль не может быть пустым'),
    confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  })
  .required()
