import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'patient_comorbidities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('patient_id')
        .unsigned()
        .references('patient_id')
        .inTable('patients')
        .onDelete('CASCADE')

      table
        .integer('comorbidity_id')
        .unsigned()
        .references('comorbidity_id')
        .inTable('comorbidities')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
