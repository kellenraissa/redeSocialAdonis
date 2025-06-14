import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Comorbidity extends BaseModel {
  public static table = 'comorbidities'

  @column({ isPrimary: true })
  declare comorbidity_id: number

  @column({ columnName: 'name' })
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
