import { TDeleteUser } from '../type'
import { DeleteUserRepository } from './../Repositories/index'

export class DeleteUserService {
  public async execute(options: TDeleteUser) {
    return new DeleteUserRepository().handle(options)
  }
}
