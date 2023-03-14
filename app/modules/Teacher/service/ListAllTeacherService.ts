import { ListAllTeacherRepository } from '../repositories/ListAllTeacherRepository'
import { TListAllTeacher } from '../type'

export class ListAllDependentServices {
  public async execute(options: TListAllTeacher) {
    return new ListAllTeacherRepository().handle(options)
  }
}
