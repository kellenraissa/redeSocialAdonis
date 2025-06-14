import Route from '@adonisjs/core/services/router'
const ComorbidityController = () => import('#controllers/comorbidity_controller')

export const publicRoute = Route.group(() => {
  Route.get('/public/comorbidities', [ComorbidityController, 'index'])
})
