import * as yup from 'yup'

export const envSchema = yup.object().shape({
  PORT: yup.number().required(),
  ROOT_PASSWORD: yup.string().required(),
  MAX_BOOKINGS_PER_USER: yup.number().default(5),
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production', 'test'])
    .required(),
  SESSION_SECRET: yup.string().required(),
})
