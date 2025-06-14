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
const ComorbidityController = () => import('#controllers/comorbidity_controller')
import Route from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

Route.group(() => {
  Route.post('/login', [AuthController, 'login'])
  Route.post('/register', [UserController, 'store'])
  Route.get('/api/public/comorbidities', [ComorbidityController, 'index'])

  Route.group(() => {
    Route.resource('user', UserController).except(['store']).apiOnly()
    Route.post('/comorbities', [ComorbidityController, 'store'])
    Route.group(() => {
      Route.post('/logout', [AuthController, 'logout'])
      Route.post('/me', [AuthController, 'me'])
    }).prefix('/auth')
  }).use(middleware.auth())
}).prefix('/api')
