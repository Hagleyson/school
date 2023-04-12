import {
  BaseModel,
  HasMany,
  HasOne,
  beforeCreate,
  column,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
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

  @column()
  public email: string

  @column()
  public alternative_email: string

  @column()
  public rg: string

  @column()
  public gender: string

  @column()
  public naturalness: string

  @column()
  public scholarship: string

  @column()
  public phone: string

  @column()
  public alternative_phone: string

  @hasMany(() => Course, { foreignKey: 'teacher_id' })
  public course: HasMany<typeof Course>

  @hasOne(() => Address, { foreignKey: 'teacher_id' })
  public address: HasOne<typeof Address>

  @beforeCreate()
  public static async CreateUUID(model: Teacher): Promise<void> {
    model.secure_id = uuidV4()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
