import { DeleteCourseRepository } from '../repositories'
import { TDeleteCourse } from '../type'

export class DeleteCourseService {
  public async execute(options: TDeleteCourse) {
    return new DeleteCourseRepository().handle(options)
  }
}
