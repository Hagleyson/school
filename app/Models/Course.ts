import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher'
import { DateTime } from 'luxon'
import { v4 as uuidV4 } from 'uuid'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public 'id': number

  @column()
  public 'secure_id': string

  @column()
  public 'name': string

  @column()
  public 'content': string

  @column()
  public 'target_audience': string

  @column()
  public 'teacher_id': number

  @belongsTo(() => Teacher, { foreignKey: 'teacher_id' })
  public 'teacher': BelongsTo<typeof Teacher>

  @column()
  public 'status': 'active' | 'inactive'

  @column()
  public 'start_date': Date

  @column()
  public 'end_date': Date

  @column()
  public 'enroll_start_date': Date

  @column()
  public 'enroll_end_date': Date

  @beforeCreate()
  public static async 'CreateUUID'(model: Course): Promise<void> {
    model.secure_id = uuidV4()
  }

  @column.dateTime({ autoCreate: true })
  public 'createdAt': DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public 'updatedAt': DateTime
}
