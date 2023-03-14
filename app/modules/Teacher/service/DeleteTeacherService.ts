import { DeleteTeacherRepository } from '../repositories'
import { TDeleteTeacher } from '../type'

export class DeleteTeacherService {
  public async execute(options: TDeleteTeacher) {
    return new DeleteTeacherRepository().handle(options)
  }
}
