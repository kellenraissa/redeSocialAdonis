/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UserController = () => import('#controllers/user_controller')
const AuthController = () => import('#controllers/auth_controller')
import Route from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

Route.group(() => {
  // Route.get('/', async () => {
  //   return { hello: 'wolrd' }
  // }),
  Route.post('/login', [AuthController, 'login'])

  Route.group(() => {
    Route.resource('user', UserController).apiOnly(),
      Route.group(() => {
        Route.post('/logout', [AuthController, 'logout'])
        Route.post('/me', [AuthController, 'me'])
      }).prefix('/auth')
  }).use(middleware.auth())
}).prefix('/api')
