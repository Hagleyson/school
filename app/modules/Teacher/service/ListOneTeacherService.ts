import { ListOneTeacherRepository } from '../repositories'

export class ListOneTeacherService {
  public async execute(secure_id: string) {
    return new ListOneTeacherRepository().handle(secure_id)
  }
}
