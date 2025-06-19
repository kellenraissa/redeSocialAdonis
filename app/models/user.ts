import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, column, hasOne } from '@adonisjs/lucid/orm'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import Patient from './patient.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

type UserQuery = ModelQueryBuilderContract<typeof User>
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  public static table = 'users'

  @column({ columnName: 'id', isPrimary: true })
  declare id: number

  @column()
  declare role: 'admin' | 'patient'

  @column({ columnName: 'name' })
  declare name: string

  @column({ columnName: 'username' })
  declare username: string

  @column({ columnName: 'email' })
  declare email: string

  @column({ columnName: 'password', serializeAs: null })
  declare password: string

  @column({ columnName: 'status' })
  declare status: string

  @hasOne(() => Patient, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare patient: HasOne<typeof Patient>

  @column.dateTime({ columnName: 'created_at', autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({
    columnName: 'updated_at',
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
  })
  declare updatedAt: DateTime

  @column.dateTime({ columnName: 'deleted_at', serializeAs: null })
  declare deleted_at: DateTime

  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: UserQuery) {
    query.whereNull('deleted_at')
  }

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
