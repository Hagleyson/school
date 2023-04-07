import { BaseModel, HasMany, beforeCreate, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Course from './Course'
import { DateTime } from 'luxon'
import { v4 as uuidV4 } from 'uuid'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public secure_id: string

  @column()
  public name: string

  @column()
  public last_name: string

  @column()
  public cpf: string

  @column()
  public training: string

  @column()
  public birth_date: Date

  @hasMany(() => Course, { foreignKey: 'teacher_id' })
  public course: HasMany<typeof Course>

  @beforeCreate()
  public static async CreateUUID(model: Teacher): Promise<void> {
    model.secure_id = uuidV4()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
