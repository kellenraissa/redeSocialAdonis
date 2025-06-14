import type { HttpContext } from '@adonisjs/core/http'

import Comorbidity from '#models/comorbidity'
import { CreateComorbityValidator } from '#validators/comorbity'

export default class ComorbidityController {
  public async index({ response, auth }: HttpContext) {
    console.log('🔍 Entrou no ComorbidityController.store')
    console.log('🔐 Usuário:', auth.user)
    try {
      const comorbities = await Comorbidity.all()
      return response.ok(comorbities)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao buscar comorbidades', error })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(CreateComorbityValidator)
      const comorbity = await Comorbidity.create(data)
      return response.created({ message: 'Comorbidade cadastrada com sucesso!', comorbity })
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao criar comorbidade',
        error: error.messages || error.message,
      })
    }
  }
}
