import {ConfigService} from '@nestjs/config'
import {Injectable, NestMiddleware} from '@nestjs/common'
import {NextFunction, Request, Response} from 'express'
import {envSchema} from 'src/shared/schema/env.schema'
import * as yup from 'yup'
import session from 'express-session'
import {Session} from '../entities'
import {TypeormStore} from 'connect-typeorm/out'
import ms from 'ms'
import {join} from 'path'
import {cwd} from 'process'
import {DataSource} from 'typeorm'

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService<yup.InferType<typeof envSchema>>,
  ) {
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const db = await new DataSource({
      type: 'sqlite',
      database: join(cwd(), 'database', 'data.db'),
      synchronize: this.configService.get<string>('NODE_ENV') !== 'production',
      entities: [Session],
    }).initialize()
    const repo = db.getRepository(Session)
    session({
      secret: this.configService.getOrThrow<string>('SESSION_SECRET'),
      name: 'OSL_SESSION',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(repo),
      cookie: {
        maxAge: ms('30 days'),
        signed: true,
        httpOnly: true,
        sameSite: true,
      },
    })(req, res, next)
  }
}
