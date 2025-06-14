import { NextFn } from '@adonisjs/core/types/http'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminOnlyMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    console.log('✅ Entrou no middleware adminOnly')
    if (!ctx.auth.user) {
      console.log('[MIDDLEWARE ADMIN] Usuário não autenticado.')
      return ctx.response.unauthorized({ message: 'Você não está autenticado.' })
    }

    console.log('[MIDDLEWARE ADMIN] role =>', ctx.auth.user.role)

    if (ctx.auth.user.role !== 'admin') {
      return ctx.response.unauthorized({ message: 'Acesso restrito a administradores.' })
    }

    return await next()
  }
}
