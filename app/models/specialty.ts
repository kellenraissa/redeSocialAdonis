import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Doctor from './doctor.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Specialty extends BaseModel {
  @column({ isPrimary: true, columnName: 'specialty_id' })
  declare specialty_id: number

  @column({ columnName: 'name' })
  declare name: string

  @manyToMany(() => Doctor, {
    pivotTable: 'doctor_specialties',
    localKey: 'specialty_id',
    pivotForeignKey: 'specialty_id',
    relatedKey: 'doctor_id',
    pivotRelatedForeignKey: 'doctor_id',
  })
  declare doctors: ManyToMany<typeof Doctor>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
