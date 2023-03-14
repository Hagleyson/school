import { ListAllCourseRepository } from '../repositories'
import { TListAllCourse } from '../type'

export class ListAllCourseService {
  public async execute(options: TListAllCourse) {
    return new ListAllCourseRepository().handle(options)
  }
}
