/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
| Todas as rotas da aplicação, separadas por tipo de acesso.
| Prefixo geral: /api
*/

import Route from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import PatientController from '#controllers/patient_controller'

const UserController = () => import('#controllers/user_controller')
const AuthController = () => import('#controllers/auth_controller')
const ComorbidityController = () => import('#controllers/comorbidity_controller')

Route.group(() => {
  /*
  |--------------------------------------------------------------------------
  | Rotas Públicas (sem login)
  |--------------------------------------------------------------------------
  */
  Route.get('/public/comorbidities', [ComorbidityController, 'index'])
  Route.post('/patients/register', [UserController, 'store'])
  Route.post('/auth/login', [AuthController, 'login'])

  /*
  |--------------------------------------------------------------------------
  | Rotas de Usuário Autenticado (Paciente ou Admin)
  |--------------------------------------------------------------------------
  */
  Route.group(() => {
    Route.post('/auth/logout', [AuthController, 'logout'])
    Route.post('/auth/me', [AuthController, 'me'])
  }).use(middleware.auth())

  /*
  |--------------------------------------------------------------------------
  | Rotas Administrativas (Backoffice)
  |--------------------------------------------------------------------------
  */
  Route.group(() => {
    Route.resource('/admin/user', UserController).except(['store']).apiOnly()
    Route.post('/admin/comorbidities', [ComorbidityController, 'store'])
    Route.get('/patients', [PatientController, 'index'])
  }).use([middleware.auth(), middleware.adminOnly()])
}).prefix('/api')
