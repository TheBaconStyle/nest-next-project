import { NextFunction } from 'express'
import { Controller, Get, Next, Post, Render, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { AuthorizeGuard } from './auth/guards/authorize.guard'
import { RoleGuard } from './auth/guards/role.guard'

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Render('index')
  async home() {
    return {}
  }

  @Get('account')
  @UseGuards(AuthorizeGuard)
  @Render('account')
  protectedRoute() {
    return 'udhaiuhwdhadhwa'
  }
}
