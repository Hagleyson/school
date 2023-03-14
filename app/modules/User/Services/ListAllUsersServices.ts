import { TUser } from '../type'
import { ListAllUserRepository } from './../Repositories/index'
export class ListAllUsersServices {
  public async execute(options: TUser) {
    return new ListAllUserRepository().handle(options)
  }
}
