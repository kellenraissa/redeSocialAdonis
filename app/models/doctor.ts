import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Specialty from './specialty.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Doctor extends BaseModel {
  @column({ isPrimary: true, columnName: 'doctor_id' })
  declare doctor_id: number

  @column({ columnName: 'crm' })
  declare crm: string

  @column({ columnName: 'name' })
  declare name: string

  @manyToMany(() => Specialty, {
    pivotTable: 'doctor_specialties',
    localKey: 'doctor_id',
    pivotForeignKey: 'doctor_id',
    relatedKey: 'specialty_id',
    pivotRelatedForeignKey: 'specialty_id',
  })
  declare specialties: ManyToMany<typeof Specialty>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
