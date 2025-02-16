import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Post extends BaseModel {
  public static table = 'posts'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'description' })
  declare description: string

  @column({ columnName: 'image' })
  declare image: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
