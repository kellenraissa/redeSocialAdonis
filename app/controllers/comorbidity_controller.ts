import type { HttpContext } from '@adonisjs/core/http'

import Comorbidity from '#models/comorbidity'
import { CreateComorbityValidator, ListingValidator } from '#validators/comorbity'

export default class ComorbidityController {
  public async index({ response, request, auth }: HttpContext) {
    try {
      const {
        search,
        orderBy = 'created_at',
        orderDirection = 'desc',
        page = 1,
        take = 3,
      } = await request.validateUsing(ListingValidator)

      const query = Comorbidity.query()

      if (search && search.trim() !== '') {
        query.whereILike('name', `%${search.trim()}%`)
      }

      if (orderBy) {
        query.orderBy(orderBy, orderDirection)
      }

      const paginated = await query.paginate(page, take)

      return response.ok(paginated.serialize())
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
