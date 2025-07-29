import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  public async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      if (!user) {
        return response.abort('Invalid credentials')
      }

      const token = await User.accessTokens.create(user)

      return {
        token,
        user,
      }
    } catch (error) {
      console.log(error)
      response.unauthorized({ message: 'Acesso não autorizado' })
    }
  }

  public async logout({ auth, request, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return response.status(203)
  }

  public async me({ auth, request, response }: HttpContext) {
    const user = auth.user!

    return user
  }
}
