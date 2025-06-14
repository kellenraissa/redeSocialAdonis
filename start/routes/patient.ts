import Route from '@adonisjs/core/services/router'
import { middleware } from '../kernel.js'

const UserController = () => import('#controllers/user_controller')

Route.group(() => {
  Route.post('/register', [UserController, 'store'])
}).prefix('/patients')
