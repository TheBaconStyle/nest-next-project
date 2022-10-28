import * as yup from 'yup'

export const envSchema = yup.object().shape({
  PORT: yup.number().required(),
  ROOT_PASSWORD: yup.string().required(),
  MAX_BOOKINGS_PER_USER: yup.number().default(5),
  SESSION_SECRET: yup.string().required(),
})
