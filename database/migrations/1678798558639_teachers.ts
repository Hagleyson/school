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
      table.string('email').notNullable().unique()
      table.string('alternative_email').notNullable().unique()
      table.string('rg').notNullable()
      table.string('gender').notNullable()
      table.string('naturalness').notNullable()
      table.string('scholarship').notNullable()
      table.string('phone').notNullable()
      table.string('alternative_phone').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
