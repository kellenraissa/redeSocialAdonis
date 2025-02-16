import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { CreateUserValidator, UpdateUserValidator } from '#validators/user'
import { DateTime } from 'luxon'

export default class UserController {
  public async index({ response }: HttpContext) {
    try {
      const users = await User.all()
      return response.ok(users)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao buscar usuários', error })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(CreateUserValidator)

      const user = await User.create(data)
      return response.created({ message: 'Usuário criado com sucesso', user })
    } catch (error) {
      return error
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return response.ok(user)
    } catch (error) {
      return response.notFound({ message: 'Usuário não encontraado' })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const data = await request.validateUsing(UpdateUserValidator)

      user.merge(data)
      await user.save()

      return response.ok({ message: 'Usuário atualizado com sucesso', user })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao atualizar usuário', error })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      user.deleted_at = DateTime.now()
      await user?.save()

      return response.ok({ message: 'Usuário desativado' })
    } catch (error) {
      return response.notFound({ message: 'Usuário não encontrado' })
    }
  }
}
