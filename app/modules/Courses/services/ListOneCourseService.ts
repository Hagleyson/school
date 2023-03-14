import { ListOneCourseRepository } from '../repositories'

export class ListOneCourseService {
  public async execute(secure_id: string) {
    return new ListOneCourseRepository().handle(secure_id)
  }
}
