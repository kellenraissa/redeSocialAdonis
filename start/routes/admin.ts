import Route from '@adonisjs/core/services/router'
import { middleware } from '../kernel.js'

const UserController = () => import('#controllers/user_controller')
const ComorbidityController = () => import('#controllers/comorbidity_controller')

Route.group(() => {
  Route.resource('user', UserController).except(['store']).apiOnly()
  Route.post('/comorbidities', [ComorbidityController, 'store'])
})
  .prefix('/admin')
  .middleware([middleware.auth(), middleware.adminOnly()])
