import Router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')

Router.group(() => {
  Router.post('/login', [AuthController, 'login'])
  Router.post('/logout', [AuthController, 'logout'])
  Router.post('/me', [AuthController, 'me'])
})
  .prefix('/auth')
  .use(middleware.auth())
