import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Comorbidity from './comorbidity.js'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  declare patient_id: number

  @column({ columnName: 'user_id' })
  declare user_id: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Comorbidity, {
    pivotTable: 'patient_comorbidities',
  })
  declare comorbidities: ManyToMany<typeof Comorbidity>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
