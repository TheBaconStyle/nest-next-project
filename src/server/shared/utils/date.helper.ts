import { Dayjs } from 'dayjs'

export function DateToSQLite(date: Dayjs) {
  return date.toISOString().replace(/T/g, ' ').replace(/Z/g, '')
}
