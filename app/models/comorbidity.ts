import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Patient from './patient.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Comorbidity extends BaseModel {
  public static table = 'comorbidities'

  @column({ isPrimary: true })
  declare comorbidity_id: number

  @column({ columnName: 'name' })
  declare name: string

  @manyToMany(() => Patient, {
    pivotTable: 'patient_comorbidities',
    localKey: 'comorbidity_id',
    pivotForeignKey: 'comorbidity_id',
    relatedKey: 'patient_id',
    pivotRelatedForeignKey: 'patient_id',
  })
  declare patients: ManyToMany<typeof Patient>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
