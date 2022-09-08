import { join } from 'path'
import { cwd } from 'process'
import { DataSource, DataSourceOptions } from 'typeorm'
import {
  Booking,
  Category,
  Facility,
  Role,
  Session,
  User,
} from './src/server/entities'

const config: DataSourceOptions = {
  type: 'sqlite',
  database: join(cwd(), 'database', 'data.db'),
  synchronize: false,
  entities: [Role, User, Session, Booking, Facility, Category],
  migrations: ['migrations/*.{ts, js}'],
}

export default new DataSource(config)
