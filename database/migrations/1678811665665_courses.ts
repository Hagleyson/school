import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('secure_id').unique().notNullable()
      table.string('name').notNullable()
      table.text('content').notNullable()
      table.string('target_audience').notNullable()
      table.enu('status', ['active', 'inactive'])
      table.string('start_date').notNullable()
      table.string('end_date').notNullable()
      table.string('enroll_start_date').notNullable()
      table.string('enroll_end_date').notNullable()

      table.integer('teacher_id').unsigned().references('id').inTable('teachers').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
