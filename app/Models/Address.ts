import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher'
import { DateTime } from 'luxon'
import { v4 as uuidV4 } from 'uuid'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public secure_id: string

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public neighborhood: string

  @column()
  public complement?: string | null

  @column()
  public teacher_id: number

  @belongsTo(() => Teacher, { foreignKey: 'teacher_id' })
  public teacher: BelongsTo<typeof Teacher>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async CreateUUID(model: Address): Promise<void> {
    model.secure_id = uuidV4()
  }
}
