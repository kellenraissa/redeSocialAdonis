import type { HttpContext } from '@adonisjs/core/http'
import Specialty from '#models/specialty'
import { CreateSpecialtyValidator } from '#validators/specialty'

export default class SpecialtyController {
  public async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(CreateSpecialtyValidator)
      const specialty = await Specialty.create(data)

      return response.created({ message: 'Especialidade cadastrada com sucesso!', specialty })
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao criar especialidade',
        error: error.messages || error.message,
      })
    }
  }
}
