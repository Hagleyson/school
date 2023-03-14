import { ListAllTeacherRepository } from '../repositories/ListAllTeacherRepository'
import { TListAllTeacher } from '../type'

export class ListAllTeacherServices {
  public async execute(options: TListAllTeacher) {
    return new ListAllTeacherRepository().handle(options)
  }
}
