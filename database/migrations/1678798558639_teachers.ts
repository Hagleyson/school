import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'teachers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('secure_id').unique().notNullable()
      table.string('name').notNullable()
      table.string('last_name').notNullable()
      table.string('cpf').notNullable().unique()
      table.string('training').notNullable()
      table.date('birth_date').notNullable()
      table.date('email').notNullable()
      table.date('alternative_email').notNullable()
      table.date('rg').notNullable()
      table.date('gender').notNullable()
      table.date('naturalness').notNullable()
      table.date('scholarship').notNullable()
      table.date('phone').notNullable()
      table.date('alternative_phone').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
