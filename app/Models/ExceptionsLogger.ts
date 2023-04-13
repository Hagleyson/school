import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 as uuidV4 } from 'uuid'

export default class ExceptionsLogger extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public secure_id: string

  @beforeCreate()
  public static async CreateUUID(model: ExceptionsLogger): Promise<void> {
    model.secure_id = uuidV4()
  }
  @column()
  public error: string

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
